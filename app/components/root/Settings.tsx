/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RootState, useAppDispatch, useAppSelector } from '@/lib/store'
import { change } from '@/lib/reducers/uiSlice'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { useChangePasswordMutation } from '@/services/auth.service'
import toast from 'react-hot-toast'
import { useUpdateUserByIdMutation } from '@/services/users.service'

const profileFormSchema = z.object({
  username: z.string().min(2).max(30).optional(),
  nickname: z.string().min(2).max(50).optional(),
  bio: z.string().max(160).optional(),
  email: z.string().email().optional(),
  isPrivate: z.boolean().optional(),
  showLikedTransformations: z.boolean().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This would come from your database in a real app


export interface ChangePasswordProps {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

const changePasswordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
  confirmNewPassword: z.string().min(8),
})

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true)
  const [marketingEmails, setMarketingEmails] = useState<boolean>(false)


  const auth = useAppSelector((state: RootState) => state.auth)

  const defaultValues: Partial<ProfileFormValues> = {
    username: auth.user?.username,
    nickname: auth.user?.nickname,
    bio: auth.user?.bio,
    email: auth.user?.email,
    isPrivate: auth.user?.isPrivate,
  }




  const [changePassword, {
    isLoading: isChangePasswordLoading,
  }] = useChangePasswordMutation();


  const [updateProfile, {
    isLoading: isUpdateProfileLoading
  }] = useUpdateUserByIdMutation();


  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(change("Settings"))
  }, [dispatch])

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  })

  const changePasswordForm = useForm<ChangePasswordProps>({
    resolver: zodResolver(changePasswordSchema),
  })

  const onChangePasswordSubmit = async (data: ChangePasswordProps) => {
    try {
      if (data.newPassword !== data.confirmNewPassword) {
        toast.error("Passwords do not match");
      };
      const updateData = {
        oldPassword: data.currentPassword,
        newPassword: data.newPassword
      }
      const response = await changePassword(updateData).unwrap();
      if (response?.error) {
        toast.error(response.error)
      } else {
        toast.success("Password updated successfully")
      }
      changePasswordForm.reset();
    } catch (error) {
      console.log(error)
      toast.error("An error occurred")
    }
  };

  async function onSubmit(data: ProfileFormValues) {
    try {
      const updateData = {
        id: auth.user?._id || '',
        dto: {
          username: data.username,
          name: data.nickname,
          bio: data.bio,
          isPrivate: data.isPrivate,
        }
      }
      const response = await updateProfile(updateData).unwrap();
      if (!response) {
        console.log(response)
        toast.error("Something went wrong")
      } else {
        console.log(response)
        toast.success("Profile updated successfully")
      }
    } catch (error) {
      console.log(error)
      toast.error("An error occurred")
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account details and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...changePasswordForm}>
                <form onSubmit={changePasswordForm.handleSubmit(onChangePasswordSubmit)} className="space-y-8">
                  <FormField
                    control={changePasswordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={changePasswordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={changePasswordForm.control}
                    name="confirmNewPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    disabled={isChangePasswordLoading || !changePasswordForm.formState.isValid}
                    type='submit'>Save Changes</Button>
                </form>

              </Form>

            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage your notification preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="marketing-emails">Marketing Emails</Label>
                <Switch
                  id="marketing-emails"
                  checked={marketingEmails}
                  onCheckedChange={setMarketingEmails}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/assets/placeholder.jpg" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    Manage your public profile and privacy settings
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...(field as any)} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name. It can only contain letters, numbers, and dashes.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nickname"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormDescription>
                          Your full nickname as you&apos;d like it to appear on your profile.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about yourself"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Brief description for your profile. Maximum 160 characters.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isPrivate"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Private Profile</FormLabel>
                          <FormDescription>
                            Allow others to view your profile and transformations
                          </FormDescription>
                        </div>
                        <FormControl>
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-gray-600 cursor-pointer"
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {/* <FormField
                    control={form.control}
                    name="showLikedTransformations"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Show Liked Transformations</FormLabel>
                          <FormDescription>
                            Make your liked transformations visible to others
                          </FormDescription>
                        </div>
                        <FormControl>
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-gray-600 cursor-pointer"
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  /> */}
                  <Button
                    disabled={isUpdateProfileLoading || !form.formState.isValid}
                    type="submit">Update profile</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


