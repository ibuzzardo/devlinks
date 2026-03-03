export interface Link {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
}

export interface Social {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}