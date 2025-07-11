import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from "../../generated/prisma/client";

const prismaClient = new PrismaClient()
const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH
}

export class PostgresLogDataSource implements LogDatasource {

  async saveLog(log: LogEntity): Promise<void> {
    await prismaClient.logModel.create({
      data: {
        ...log,
        level: severityEnum[log.level],
      }
    });

    console.log(new Date(), 'Log saved to Postgres');
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const dbLogs = await prismaClient.logModel.findMany({
      where: {
        level: severityEnum[severityLevel]
      }
    });

    return dbLogs.map( dbLog => LogEntity.fromObject(dbLog) );
  }
}
