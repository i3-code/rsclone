import StandardHedgehog from '../sprites/enemies/standardHedgehog';
import JumpingHedgehog from '../sprites/enemies/jumpingHedgehog';

const registeredTypes = {
  StandardHedgehog,
  JumpingHedgehog,
};

export default class Enemy {
  constructor(type, ...props) {
    console.log(type);
    return new registeredTypes[type](...props);
  }
}
