export interface ApiResponse {
  status: "success" | "error" | "pending";
  data: ImageData[];
}

export interface ImageData {
  _id: string;
  name: string;
  path: string;
}
