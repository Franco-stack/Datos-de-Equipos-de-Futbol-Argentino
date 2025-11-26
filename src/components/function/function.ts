import Boca from "./Boca.png";
import River from "./River.png";
import Racing from "./Racing.png";
import Independiente from "./Independiente.png";
import SanLorenzo from "./SanLorenzo.png";
import RosarioCentral from "./RosarioCentral.png";
import Huracan from "./Huracan.png";
import Estudiantes from "./Estudiantes.png";
import Gimnasia from "./Gimnasia.png";
import Newells from "./Newells.png";
import Aldosivi from "./Aldosivi.png";
import ArgentinosJuniors from "./ArgentinosJuniors.png";
import AtleticoTucuman from "./AtleticoTucuman.png";
import Banfield from "./Banfield.png";
import BarracasCentral from "./BarracasCentral.png";
import Belgrano from "./Belgrano.png";
import CentralCordoba from "./CentralCordoba.png";
import DefensaYJusticia from "./DefensaYJusticia.png";
import GodoyCruz from "./GodoyCruz.png";
import IndependienteRivadavia from "./IndependienteRivadavia.png";
import Instituto from "./Instituto.png";
import Lanus from "./Lanus.png";
import Platense from "./Platense.png";
import Riestra from "./Riestra.png";
import SanMartin from "./SanMartin.png";
import Sarmiento from "./Sarmiento.png";
import Talleres from "./Talleres.png";
import Tigre from "./Tigre.png";
import Union from "./Union.png";
import Velez from "./Velez.png";

const Equipo: Record<string | number, string> = {
  1: River,
  2: Boca,
  3: Racing,
  4: Independiente,
  5: SanLorenzo,
  6: Huracan,
  7: Estudiantes,
  8: Gimnasia,
  9: Newells,
  10: RosarioCentral,
  11: Aldosivi,
  12: ArgentinosJuniors,
  13: AtleticoTucuman,
  14: Banfield,
  15: BarracasCentral,
  16: Belgrano,
  17: CentralCordoba,
  18: DefensaYJusticia,
  19: GodoyCruz,
  20: IndependienteRivadavia,
  21: Instituto,
  22: Lanus,
  23: Platense,
  24: Riestra,
  25: SanMartin,
  26: Sarmiento,
  27: Talleres,
  28: Tigre,
  29: Union,
  30: Velez,
};

export const getImageById = (id: string | number): string => {
  return Equipo[id];
};