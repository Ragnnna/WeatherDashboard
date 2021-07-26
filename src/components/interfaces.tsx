export interface WrappedMapProps {
  googleMapUrl: string
}

export interface DialogWindowProps {
  close: Function,
  windowData: {
    height: number,
    width: number
  }
}

export interface chartDataState {
  height: number,
  width: number
}

export interface tempObject {
  feels_like: number
  grnd_level: number
  humidity: number
  pressure: number
  sea_level: number
  temp: number
  temp_kf: number
  temp_max: number
  temp_min: number
}