import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EventsService {

  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http.get('https://jirahrinsights.misteraverin.now.sh/events');
  }
}
