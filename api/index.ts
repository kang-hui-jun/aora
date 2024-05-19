import { User } from "@/types/user";
import { request } from "@/utils/request";

export const getCurrentUser = async (): Promise<User> => {
  return request("/getCurrentUser");
};

export const createUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  return request("/sign-up", { method: "POST", data });
};

export const signIn = async (data: { email: string; password: string }) => {
  return request("/sign-in", { method: "POST", data });
};

export const signOut = async () => {
  return request("/sign-out");
};

// 获取所有视频帖子
export const getAllPosts = async () => {
  return request("/getAllPosts");
};