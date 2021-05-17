import _package from '../package.json';

class Constants {
    isDevelopment = process.env.NODE_ENV === 'development';
    package = _package;
}

const constantsInstance = new Constants();
export default constantsInstance;
