type ApiPostType = "status";

export type ApiPost = {
  id: string;
  from_name: string;
  from_id: string;
  message: string;
  type: ApiPostType;
  created_time: string;
};

export type ApiPostResponse = {
  meta: {
    request_id: string;
  };
  data: {
    page: number;
    posts: ApiPost[];
  };
};

export type Post = {
  id: string;
  authorName: string;
  authorId: string;
  message: string;
  type: ApiPostType;
  createdTime: Date;
};

export type ApiRegisterResponse = {
  meta: {
    request_id: string;
  };
  data: {
    client_id: string;
    email: string;
    sl_token: string;
  };
};
