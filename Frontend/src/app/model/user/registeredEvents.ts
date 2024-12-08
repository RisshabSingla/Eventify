export interface Event {
  id: number;
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
