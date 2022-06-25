import type { Post, ApiPost } from "../api";

export const postMapper = ({
  id,
  from_name,
  from_id,
  message,
  type,
  created_time,
}: ApiPost): Post => ({
  id,
  authorName: from_name,
  authorId: from_id,
  message,
  type,
  createdTime: new Date(created_time),
});
