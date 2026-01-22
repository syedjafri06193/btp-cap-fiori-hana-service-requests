using servicerequests as db from '../db/schema';

service ServiceRequests @path:'/odata/v4/service-requests' {

  entity Requests as projection on db.Requests;
  entity Comments as projection on db.Comments;

  action assign(requestID : UUID, assignee : String) returns Requests;
  action setStatus(requestID : UUID, status : String) returns Requests;

}
