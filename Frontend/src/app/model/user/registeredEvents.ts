export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  image: string;
  status: string;
}

export interface UserEvents {
  registered: Event[];
  attended: Event[];
  absent: Event[];
}
