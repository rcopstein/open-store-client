import {FailureType} from './FailureType';
import {Failure} from './Failure';

export class IDNotFoundFailure implements Failure {
  message = 'One or more products were not found';
  type = FailureType.SKUNotFound;

  constructor(public param: Array<string>) {}
}
