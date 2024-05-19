import qs from "qs";

const apiUrl = "http://192.168.31.221:3000";

interface Config extends RequestInit {
  params?: Record<string, string>;
  data?: Record<string, string>;
}

export const request = async (
  endpoint: string,
  { params, data, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    ...customConfig,
  };

  if (config.method === "GET") {
    endpoint += `?${qs.stringify(params)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  const response = await fetch(`${apiUrl}${endpoint}`, config);

  if (response.status === 401) {
    return Promise.reject({ message: "未经授权" });
  }
  if (response.status !== 200) {
    return Promise.reject({ message: "请求失败" });
  }
  return await response.json();
};

export const uploadFile = async (file: {
  uri: string;
  name: string;
  mimeType: string;
}) => {
  const formData = new FormData();
  formData.append("file", {
    uri: file.uri,
    name: file.name,
    type: file.mimeType,
  });
  
  try {
    const result = await fetch(`${apiUrl}/upload`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (result.status !== 200) {
      return Promise.reject({ message: "上传失败" });
    }
    return await result.json();
  } catch (error) {
    console.log(error);
  }
};
