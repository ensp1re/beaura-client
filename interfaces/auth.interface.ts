/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconType } from "react-icons";
import { ITransformationData } from "./root.interface";

export interface OauthElementProps {
  Icon: IconType | unknown | React.ComponentType<unknown>;
  title: string;
  onClick: () => void;
  isDisabled: boolean;
  register?: any;
}

export interface LoginFormProps {
  emailOrUsername: string;
  password: string;
}

export interface ISignUpPostData {
  email: string;
  username: string;
  password: string;
}

export interface RegisterFormProps {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordFormProps {
  email: string;
}

export interface ResetPasswordFormProps {
  password: string;
  confirmPassword: string;
}

export interface IAuthRedux {
  _id: string,
  username: string,
  email: string,
  role: string,
  status?: string,
  nickname?: string,
  profilePicture?: string,
  isPrivate?: boolean,
  bio?: string,
  credits?: number,
  transformations?: ITransformationData[],
}