import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Dimension {
  number: string;
  title: string;
  text: string;
  items: string[];
}

interface JourneyStep {
  number: string;
  title: string;
  text: string;
}

interface Guardian {
  name: string;
  place: string;
  value: string;
  image: string;
  accent: 'terracota' | 'ocre' | 'morado' | 'azul' | 'verde';
}

interface MapLocation {
  region: string;
  place: string;
  tradition: string;
}

interface TrackerTab {
  label: string;
  filled: number;
}

interface RealPage {
  name: string;
  place: string;
  value: string;
  image: string;
}

@Component({
  selector: 'app-sumerce',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sumerce.component.html',
  styleUrls: ['./sumerce.component.scss'],
})
export class SumerceComponent {
  readonly whatIsSteps: string[] = [
    'Organizo mi día',
    'Me propongo un reto',
    'Hago seguimiento',
    'Descubro algo nuevo',
  ];

  readonly dimensions: Dimension[] = [
    {
      number: '01',
      title: 'Organizarme',
      text: 'La agenda acompaña al estudiante en su día a día escolar.',
      items: ['Calendario', 'Planificación', 'Actividades', 'Fechas importantes'],
    },
    {
      number: '02',
      title: 'Crecer',
      text: 'El estudiante convierte pequeñas metas en retos de 30 días y observa su propio progreso.',
      items: ['Tracker de hábitos', 'Ahorro', 'Aprendizaje de 30 minutos', 'Reto personal'],
    },
    {
      number: '03',
      title: 'Descubrir',
      text: 'Cada mes conecta al estudiante con una parte diferente de Colombia.',
      items: ['Región', 'Lugar', 'Tradición', 'Historia', 'Personaje', 'Valor'],
    },
  ];

  readonly journey: JourneyStep[] = [
    { number: '01', title: 'Descubro el lugar', text: 'Conozco Vélez y una tradición de Santander.' },
    { number: '02', title: 'Conozco una historia', text: 'Un personaje me acerca a la cultura y al territorio.' },
    { number: '03', title: 'Encuentro un valor', text: 'La historia se conecta con un valor como la perseverancia.' },
    { number: '04', title: 'Me propongo un reto', text: 'Elijo algo que quiero mejorar durante 30 días.' },
    { number: '05', title: 'Hago seguimiento', text: 'Cada día registro mi progreso.' },
    { number: '06', title: 'Miro lo que logré', text: 'Al finalizar el reto reconozco mi constancia y lo que aprendí.' },
  ];

  readonly trackerLadder: string[] = [
    '"Quiero leer más."',
    '30 minutos de lectura al día.',
    'Tracker de 30 días.',
    'Marco cada día.',
    'Observo mi progreso.',
  ];

  readonly trackerTabs: TrackerTab[] = [
    { label: 'Mi hábito', filled: 9 },
    { label: 'Mi meta de ahorro', filled: 14 },
    { label: '30 min. de aprendizaje', filled: 21 },
    { label: 'Mi reto del mes', filled: 5 },
  ];
  activeTrackerIndex = 0;
  readonly days = Array.from({ length: 30 }, (_, index) => index + 1);

  get activeTracker(): TrackerTab {
    return this.trackerTabs[this.activeTrackerIndex];
  }

  selectTracker(index: number): void {
    this.activeTrackerIndex = index;
  }

  readonly realPages: RealPage[] = [
    { name: 'Valentina', place: 'Nobsa · Boyacá', value: 'Empatía', image: 'assets/ValentinaNobsa.png' },
    { name: 'Daniel', place: 'Duitama · Boyacá', value: 'Disciplina', image: 'assets/DanielDuitama.png' },
  ];

  readonly colombiaExamples = [
    { place: 'Nobsa', fact: 'ruanas' },
    { place: 'Vélez', fact: 'bocadillo' },
    { place: 'Duitama', fact: 'ciclismo' },
    { place: 'Amazonas', fact: 'biodiversidad y autocuidado' },
    { place: 'Bogotá', fact: 'organización y diversidad urbana' },
  ];

  readonly mapLocations: MapLocation[] = [
    { region: 'BOYACÁ', place: 'Nobsa', tradition: 'Tradición de ruanas' },
    { region: 'SANTANDER', place: 'Vélez', tradition: 'Tradición del bocadillo' },
    { region: 'BOYACÁ', place: 'Duitama', tradition: 'Ciclismo' },
    { region: 'AMAZONAS', place: 'Amazonas', tradition: 'Naturaleza y biodiversidad' },
    { region: 'CUNDINAMARCA', place: 'Bogotá', tradition: 'Organización y diversidad urbana' },
  ];

  discoveredLocation: MapLocation | null = null;

  showLocation(location: MapLocation): void {
    this.discoveredLocation = location;
  }

  readonly guardians: Guardian[] = [
    { name: 'Sofía', place: 'Vélez · Santander', value: 'Perseverancia', image: 'assets/3.png', accent: 'terracota' },
    { name: 'Mateo', place: 'Amazonas', value: 'Autocuidado', image: 'assets/4.png', accent: 'ocre' },
    { name: 'Sebas', place: 'Bogotá', value: 'Organización', image: 'assets/2.png', accent: 'azul' },
    { name: 'Valentina', place: 'Nobsa · Boyacá', value: 'Empatía', image: 'assets/5.png', accent: 'morado' },
    { name: 'Daniel', place: 'Duitama · Boyacá', value: 'Disciplina', image: 'assets/8.png', accent: 'terracota' },
    { name: 'Ana', place: 'Villa de Leyva · Boyacá', value: 'Creatividad', image: 'assets/7.png', accent: 'ocre' },
  ];
}

