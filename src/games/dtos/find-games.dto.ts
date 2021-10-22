import { BaseQueryParametersDto } from 'src/shared/base-query-parameters.dto';

export class FindGamesQueryDto extends BaseQueryParametersDto {
  name: string;
  company: string;
  genre: string;
}
