import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { from } from 'rxjs/internal/observable/from';
import { map } from 'rxjs/operators';
import { Answer } from 'src/database/answer.model';
import { User } from 'src/database/user.model';
import { ANSWER_MODEL, USER_MODEL } from '../database/database.constants';
import { parseRussianDate } from './utils';

@Injectable()
export class StatisticsService {
  constructor(
    @Inject(USER_MODEL) private userModel: Model<User>,
    @Inject(ANSWER_MODEL) private answerModel: Model<Answer>,
  ) { }
  getUserStatsGroupedByMonthAndYear(dateFrom, dateTo): Observable<any> {
    return from(
      this.userModel
        .aggregate([
          {
            $match: {
              createdAt: {
                $gte: parseRussianDate(dateFrom),
                $lte: parseRussianDate(dateTo),
              },
            },
          },
          {
            $group: {
              _id: {
                month: { $month: '$createdAt' },
                year: { $year: '$createdAt' },
              },
              total: { $sum: 1 },
            },
          },
          {
            $project: {
              month: '$_id.month',
              year: '$_id.year',
              total: '$total',
              _id: 0,
            },
          },
          { $sort: { year: -1, month: -1 } },
        ])
        .exec(),
    );
  }

  getUserNumber(dateFrom: string, dateTo: string): Observable<number> {
    return from(
      this.userModel
        .aggregate([
          {
            $match: {
              createdAt: {
                $gte: new Date(dateFrom),
                $lte: new Date(dateTo),
              },
            },
          },
          {
            $count: 'count',
          },
        ])
        .exec(),
    ).pipe(map(([results]: [{ count: number }]) => results.count));
  }

  getPassedDictationNumber(dateFrom, dateTo): Observable<number> {
    return from(
      this.answerModel
        .aggregate([
          {
            $match: {
              createdAt: {
                $gte: new Date(dateFrom),
                $lte: new Date(dateTo),
              },
              percentage: {
                $gte: 50,
              },
            },
          },
          {
            $count: 'count',
          },
        ])
        .exec(),
    ).pipe(map(([results]: [{ count: number }]) => results.count));
  }

  getNotPassedDictationNumber(dateFrom, dateTo): Observable<number> {
    return from(
      this.answerModel
        .aggregate([
          {
            $match: {
              createdAt: {
                $gte: new Date(dateFrom),
                $lte: new Date(dateTo),
              },
              percentage: {
                $lte: 49,
              },
            },
          },
          {
            $count: 'count',
          },
        ])
        .exec(),
    ).pipe(map(([results]: [{ count: number }]) => results.count));
  }

  getFinishedDictationNumber(dateFrom, dateTo): Observable<number> {
    return from(
      this.answerModel
        .aggregate([
          {
            $match: {
              createdAt: {
                $gte: new Date(dateFrom),
                $lte: new Date(dateTo),
              },
            },
          },
          {
            $count: 'count',
          },
        ])
        .exec(),
    ).pipe(map(([results]: [{ count: number }]) => results.count));
  }

  getRegisteredUsersByDates(dateFrom, dateTo): Observable<number> {
    return from(
      this.userModel
        .aggregate([
          {
            $match: {
              createdAt: {
                $gte: new Date(dateFrom),
                $lte: new Date(dateTo),
              },
            },
          },
          {
            $count: 'count',
          },
        ])
        .exec(),
    ).pipe(map(([results]: [{ count: number }]) => results.count));
  }
}
