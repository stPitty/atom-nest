import { Controller, Get, Query, Scope, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HasRoles } from 'src/auth/guard/has-roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { RoleType } from 'src/shared/enum/role-type.enum';
import { allTimeDateFrom, getCurrentISODate } from './constants';
import { GetStatisticsDto } from './get-statistics.dto';
import { StatisticsService } from './statistics.service';
import { parseRussianDate, parseRussianDateEndDay } from './utils';

@ApiTags('statistics')
@Controller({ path: 'statistics', scope: Scope.REQUEST })
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}
  @Get('/registered-users')
  @HasRoles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getRegisteredUsers(@Query() query): Observable<any> {
    return forkJoin([
      this.statisticsService.getUserStatsGroupedByMonthAndYear(
        query.dateFrom,
        query.dateTo,
      ),
      this.statisticsService.getUserNumber(
        parseRussianDate(query.dateFrom),
        parseRussianDateEndDay(query.dateTo),
      ),
      this.statisticsService.getUserNumber(
        allTimeDateFrom,
        getCurrentISODate(),
      ),
    ]).pipe(
      map(([userStats, periodNumber, allTimeNumber]) => ({
        periodNumber,
        allTimeNumber,
        userStats,
      })),
    );
  }

  @Get('/passed-dictation')
  @HasRoles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getPassedDictation(@Query() query: GetStatisticsDto): Observable<any> {
    return forkJoin([
      this.statisticsService.getPassedDictationNumber(
        parseRussianDate(query.dateFrom),
        parseRussianDateEndDay(query.dateTo),
      ),
      this.statisticsService.getNotPassedDictationNumber(
        parseRussianDate(query.dateFrom),
        parseRussianDateEndDay(query.dateTo),
      ),
      this.statisticsService.getFinishedDictationNumber(
        parseRussianDate(query.dateFrom),
        parseRussianDateEndDay(query.dateTo),
      ),
      this.statisticsService.getFinishedDictationNumber(
        allTimeDateFrom,
        getCurrentISODate(),
      ),
    ]).pipe(
      map(
        ([
          passedDictation,
          notPassedDictation,
          periodNumber,
          allTimeNumber,
        ]) => ({
          passedDictation,
          notPassedDictation,
          periodNumber,
          allTimeNumber,
        }),
      ),
    );
  }
}
