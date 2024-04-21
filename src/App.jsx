import { useEffect, useState } from 'react';
import Icons from './assets/icons/Icons';
import CheckboxOption from './CheckboxOption';

function App() {
  const [configuracion, setConfiguracion] = useState({
    longitud: 12,
    mayusculas: true,
    minusculas: true,
    numeros: true,
    simbolos: true
  })
  const [palabraGenerada, setPalabraGenerada] = useState('');
  const [copied, setCopied] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [iconRotation, setIconsRotation] = useState(0);
  const [fortalezaContraseña, setFortalezaContraseña] = useState('');

  useEffect(() => {
    generatePassword();
  }, [configuracion]);

  const generatePassword = () => {
    const caracteres = [];

    if (configuracion.mayusculas) caracteres.push(...'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    if (configuracion.minusculas) caracteres.push(...'abcdefghijklmnopqrstuvwxyz');
    if (configuracion.numeros) caracteres.push(...'0123456789');
    if (configuracion.simbolos) caracteres.push(...'!@#$%^&*()_-+=[]{}|;:,.<>?');

    let palabra = '';
    for (let i = 0; i < configuracion.longitud; i++) {
      palabra += caracteres[Math.floor(Math.random() * caracteres.length)];
    }
    setPalabraGenerada(palabra);
    setCopied(false);

    evaluarFortaleza(palabra);
};

const evaluarFortaleza = (palabra) => {
  const hasUpperCase = /[A-Z]/.test(palabra);
  const hasLowerCase = /[a-z]/.test(palabra);
  const hasNumber = /\d/.test(palabra);
  const hasSymbol = /[^A-Za-z0-9]/.test(palabra);
  let fortaleza = 'contraseñaDebil';

  const conditionsMet = [
    configuracion.mayusculas && hasUpperCase,
    configuracion.minusculas && hasLowerCase,
    configuracion.numeros && hasNumber,
    configuracion.simbolos && hasSymbol
  ].filter(Boolean).length;

  if (palabra.length >= 12 && conditionsMet >= 3) {
    fortaleza = 'contraseñaFuerte';
  } else if (palabra.length >= 8 && conditionsMet >= 2) {
    fortaleza = 'contraseñaMedia';
  }

  setFortalezaContraseña(fortaleza);
};

  const handleConfiguracionChange = (e) => {
    const { name, type, checked, value } = e.target;

    setConfiguracion(prevConfiguracio => ({
      ...prevConfiguracio,
      [name]: type === 'checkbox' ? checked : parseInt(value)
    }))


    setIconsRotation(prevRotation => prevRotation + 180);

    if (name === 'longitud') {
      generatePassword();
    }
  }

  const handleNumberInputChange = (e) => {
    const { value } = e.target;

    setConfiguracion(prevConfiguracio => ({
      ...prevConfiguracio,
      longitud: parseInt(value)
    }));
    // Generamos la contraseña al cambiar la longitud
    generatePassword();
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(palabraGenerada);
    setCopied(true);
    setShowCopiedMessage(true);

    setTimeout(() => {
      setShowCopiedMessage(false);
    }, 1500);
  }

  const handleInputChange = (e) => {
    const { value } = e.target;
    setPalabraGenerada(value);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-800 to-blue-500">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-8 animate-pulse">¡CRIPTOclave: Contraseñas Increíbles!</h2>

      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-2xl border-4 border-blue-500 p-8 space-y-6">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            placeholder="Contraseña segura"
            defaultValue={palabraGenerada}
            onChange={handleInputChange}
            className="cursor-default w-full px-4 py-3 text-black placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            readOnly
          />

          <div className="absolute right-2 top-3 flex gap-2 z-20">
            <Icons.copy className="text-white cursor-pointer" onClick={copyToClipboard} />
            <Icons.generatePassword className="text-white cursor-pointer" onClick={handleConfiguracionChange} iconRotation={iconRotation} />
            {showCopiedMessage && (
              <div className="absolute -top-9 right-0 px-3 py-1 text-white bg-blue-500 rounded">¡Copiada!</div>
            )}
          </div>

          <div
            className={`absolute bottom-0 left-0 w-full h-1 rounded ${fortalezaContraseña === 'contraseñaDebil'
                ? 'bg-red-500'
                : fortalezaContraseña === 'contraseñaMedia'
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
          />
        </div>

        <div className="flex items-center gap-4">
          <input
            type="number"
            value={configuracion.longitud}
            onChange={handleNumberInputChange}
            className="w-12 text-2xl font-semibold text-center border-2 border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="9"
            max="30"
          />
          <input
            type="range"
            name="longitud"
            value={configuracion.longitud}
            onChange={handleConfiguracionChange}
            className="w-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-md appearance-none h-2 focus:outline-none"
            min="9"
            max="30"
          />
        </div>

        <div className="space-y-4">
          <CheckboxOption
            name="mayusculas"
            checked={configuracion.mayusculas}
            onChange={handleConfiguracionChange}
            label="Mayúsculas"
            disabled={!configuracion.minusculas && !configuracion.numeros && !configuracion.simbolos}
          />
          <CheckboxOption
            name="minusculas"
            checked={configuracion.minusculas}
            onChange={handleConfiguracionChange}
            label="Minúsculas"
            disabled={!configuracion.mayusculas && !configuracion.numeros && !configuracion.simbolos}
          />
          <CheckboxOption
            name="numeros"
            checked={configuracion.numeros}
            onChange={handleConfiguracionChange}
            label="Números"
            disabled={!configuracion.mayusculas && !configuracion.minusculas && !configuracion.simbolos}
          />
          <CheckboxOption
            name="simbolos"
            checked={configuracion.simbolos}
            onChange={handleConfiguracionChange}
            label="Símbolos"
            disabled={!configuracion.mayusculas && !configuracion.minusculas && !configuracion.numeros}
          />
        </div>
      </div>
    </div>


  );
}
export default App;
