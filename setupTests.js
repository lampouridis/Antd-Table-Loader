// This config setups what must tests have before running..
import { JSDOM } from "jsdom"
const dom = new JSDOM("", { url: "http://localhost" })
global.window = dom.window
global.document = dom.window.document
global.Element = dom.window.Element
global.window.matchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {},
})
