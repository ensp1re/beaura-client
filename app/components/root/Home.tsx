/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ILikeTransformationPayload, ITransformationData } from '@/interfaces/root.interface';
import { change } from '@/lib/reducers/uiSlice';
import { RootState, useAppDispatch, useAppSelector } from '@/lib/store';
import { useGetTransformationByTextQuery, useGetTransformationsByFilterQuery, useLikeTransformationMutation } from '@/services/transformation.service';
import { Filter, Search } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaHeart } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import ShareDialog from '../ShareDialog';
import { IAuthRedux } from '@/interfaces/auth.interface';

const Home: FC = (): ReactElement => {
    const filters = ["By date", "By likes", "By name"];

    const auth = useAppSelector((state: RootState) => state.auth);

    const [filteredTransformations, setFilteredTransformations] = useState<ITransformationData[]>([]);
    const [filterName, setFilterName] = useState<string>("All");
    const [mostUsedTags, setMostUsedTags] = useState<string[]>([]);

    const [search, setSearch] = useState<string>("");

    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        document.title = "Home | BeAura";
        dispatch(change("Home"));
    }, [dispatch]);

    const {
        data: transformations,
        isLoading,
    } = useGetTransformationsByFilterQuery({});


    useEffect(() => {
        if (transformations) {
            const publicTransformations = transformations.filter(
                (transformation: ITransformationData) => transformation.isPublic || transformation.userId._id === auth.user?._id
            );
            setFilteredTransformations(publicTransformations);
        }
    }, [transformations]);

    useEffect(() => {
        const sortedTransformations = [...filteredTransformations];
        if (filterName === "By date") {
            sortedTransformations.sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime());
        } else if (filterName === "By likes") {
            sortedTransformations.sort((a, b) => (b.likes?.length ?? 0) - (a.likes?.length ?? 0));
        } else if (filterName === "By name") {
            sortedTransformations.sort((a, b) => (a.title ?? "").localeCompare(b.title ?? ""));
        }
        setFilteredTransformations(sortedTransformations);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterName]);

    const [likeTransformation, {
        isLoading: isLiking,
    }] = useLikeTransformationMutation();

    const [
        dislikeTransformation,
        { isLoading: isDisliking }
    ] = useLikeTransformationMutation();

    const getMostUsedTags = (transformations: ITransformationData[]) => {
        const tags: string[] = [];
        transformations.forEach((transformation: ITransformationData) => {
            transformation.tags?.forEach((tag: string) => {
                if (!tags.includes(tag)) {
                    tags.push(tag);
                }
            });
        });
        return tags;
    };

    useEffect(() => {
        if (transformations) {
            const tags = getMostUsedTags(transformations);
            setMostUsedTags(tags);
        }
    }, [transformations]);

    const handleLikeDislike = async (id: string) => {
        try {
            const transformation = filteredTransformations.find(t => t._id === id);
            const userHasLiked = transformation?.likes?.some(like => like.userId._id === String(auth.user?._id));

            const response = userHasLiked
                ? await dislikeTransformation({ userId: auth.user?._id?.toString() as string, transformationId: id.toString() }).unwrap()
                : await likeTransformation({ userId: auth.user?._id?.toString() as string, transformationId: id.toString() }).unwrap();

            if (response) {
                const updatedTransformations = filteredTransformations.map(t =>
                    t._id === id
                        ? {
                            ...t,
                            likes: userHasLiked
                                ? t.likes?.filter(like => like.userId._id !== auth.user?._id)
                                : [...(t.likes ?? []), { userId: auth.user as IAuthRedux, transformationId: t._id }],
                        }
                        : t
                );
                setFilteredTransformations(updatedTransformations);
                toast.success(userHasLiked ? "Disliked" : "Liked");
            } else {
                toast.error("Failed to like/dislike the transformation");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to like/dislike the transformation");
        }
    };



    const checkIsLikedByAuthUser = (likes: ILikeTransformationPayload[]) => {
        const r = likes?.find((like: ILikeTransformationPayload) => like.userId._id === auth.user?._id) !== undefined;
        return r;
    }


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        if (searchQuery) {
            setSearch(searchQuery);
        }
    }, []);

    const {
        data: searchedTransformations,
        isLoading: isSearching
    } = useGetTransformationByTextQuery(
        search,
        {
            skip: search.trim() === ""
        }
    );




    const handleSearch = async () => {
        try {
            if (search.trim() === "") {
                setFilteredTransformations(transformations);
                return;
            }

            if (searchedTransformations) {
                const publicTransformations = searchedTransformations.filter(
                    (transformation: ITransformationData) => transformation.isPublic || transformation.userId._id === auth.user?._id
                );
                setFilteredTransformations(publicTransformations);
            }

            const url = new URL(window.location.href);
            url.searchParams.set('search', search);
            window.history.pushState({}, '', url);

        } catch (error) {
            console.log(error);
            toast.error("Failed to search the transformation");
        }
    };




    return (
        <div suppressHydrationWarning className="p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(e: ChangeEvent) => setSearch((e.target as HTMLInputElement).value)}
                            placeholder="Search" className="pl-9"
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                        />
                    </div>
                    <Select onValueChange={(value) => setFilterName(value as string)} value={filterName}>
                        <SelectTrigger className="w-full flex items-center gap-2 sm:w-auto">
                            <Filter className="h-4 w-4" />
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem key={"all"} value="All">All</SelectItem>
                            {filters.map((filter) => (
                                <SelectItem key={filter} value={filter}>
                                    {filter}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {mostUsedTags.slice(0, 4).map((filter) => (
                        <Button
                            key={filter}
                            variant="outline"
                            className="rounded-full"
                            size="sm"
                            onClick={() => {
                                setSearch(filter);
                                handleSearch();
                            }}
                        >
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </Button>
                    ))}
                    {mostUsedTags.length > 0 && (
                        <Button
                            variant="destructive"
                            className="rounded-full"
                            size="sm"
                            onClick={() => {
                                setSearch("");
                                setFilterName("All");
                                handleSearch();
                            }}
                        >
                            Clear
                        </Button>
                    )}
                </div>
            </div>

            {isLoading || isSearching ? (
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : filteredTransformations.length === 0 ? (
                <div className="flex items-center justify-center h-96">
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Search className="h-8 w-8 text-muted-foreground" />
                            <span className="text-lg font-medium text-muted-foreground">No transformations found</span>
                        </div>
                        <Button
                            variant="default"
                            onClick={() => router.push("/transformation/haircut")}
                            className="px-6 py-2 bg-primary text-white hover:bg-primary-dark dark:bg-primary dark:text-black dark:hover:bg-primary-dark"
                        >
                            Create Transformation
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                    {filteredTransformations.map((t: ITransformationData) => (
                        <div
                            key={uuidv4()}
                            onClick={() => router.push(`/preview-transformation/${t._id}`)}
                            className="break-inside-avoid cursor-pointer mb-4 group relative overflow-hidden rounded-lg bg-background transition-all duration-300 hover:shadow-lg"
                        >
                            <div className="relative w-full h-full" style={{ height: "500px" }}>
                                <Image
                                    src={t.toImage as string}
                                    alt={t.title as string}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <div className="flex items-center justify-between text-white">
                                        <div className="flex items-center gap-2" onClick={(e) => { e.stopPropagation(); router.push(`/profile/${t.userId.username.toLowerCase()}`); }}>
                                            <Avatar className="h-6 w-6 cursor-pointer">
                                                <AvatarImage src="/assets/placeholder.jpg" />
                                                <AvatarFallback>
                                                    {t.userId.username[0].toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm font-medium cursor-pointer">{t.userId.username.toLowerCase()}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => { e.stopPropagation(); handleLikeDislike(t._id as string); }}
                                                className={`flex items-center w-12 gap-1 transition-transform duration-300 hover:scale-110 ${checkIsLikedByAuthUser(t.likes ?? []) ? 'text-primary' : ''}`}
                                                disabled={isLiking || isDisliking}
                                                style={{ backgroundColor: 'transparent' }}
                                            >
                                                <FaHeart className="h-4 w-4" color={
                                                    checkIsLikedByAuthUser(t.likes ?? []) ? 'red' : 'white'} />

                                                <span
                                                    className='text-white'
                                                >
                                                    {t.likes?.length}
                                                </span>
                                            </Button>


                                            <div className='bg-transparent' onClick={(e) => { e.stopPropagation(); }}>
                                                <ShareDialog transformationId={t._id as string} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
