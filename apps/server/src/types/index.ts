import { Request } from 'express';

export interface UserPayload {
  id: number;
  email: string;
  roles?: string[];
}

export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

export interface DatabaseConfig {
  connectionString: string;
  maxPool: number;
  idleTimeoutMillis: number;
  connectionTimeoutMillis: number;
}
