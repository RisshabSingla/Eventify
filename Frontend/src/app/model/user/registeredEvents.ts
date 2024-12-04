export interface Event {
  id: number;
  name: String;
  date: String;
  time: String;
  location: String;
  image: String;
  status: String;
}

export interface UserEvents {
  registered: Event[];
  attended: Event[];
  absent: Event[];
}
