import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Sprite from "../../src/styles/Icons/_Sprite";

Sprite.loaded = true;

Enzyme.configure({ adapter: new Adapter() });
