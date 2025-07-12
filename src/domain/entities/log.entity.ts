export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high'
}

export interface LogEntityOptions {
  message: string;
  level: LogSeverityLevel;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions){
    const { message, level, createdAt = new Date(), origin } = options;
    this.message = message;
    this.level = level;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  // ? {"message":"Service is ok","level":"low","createdAt":"2025-07-11T03:47:15.009Z","origin":"check-service.ts"}
  static fromJSON = (json: string): LogEntity => {
    json = (json === '') ? '{}' : json;
    const { message, level, createdAt, origin } = JSON.parse(json);
    
    const log = new LogEntity({
      message: message,
      level: level,
      createdAt: new Date(createdAt),
      origin: origin
    });

    log.createdAt = new Date(createdAt);
    return log;
  }

  static fromObject = ( object: { [key: string]: any } ):LogEntity => {
    const { message, level, createdAt, origin } = object;
    const log = new LogEntity({
      message, level, createdAt, origin
    });
    return log;
  }
}
