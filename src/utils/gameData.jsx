import Carrier from "../components/Ships/ShipImages/Carrier";
import Battleship from "../components/Ships/ShipImages/Battleship";
import Destroyer from "../components/Ships/ShipImages/Destroyer";
import horus from '../assets/imgs/horus-lupercal.png';
import roboute from '../assets/imgs/guilliman.png';
import blood from '../assets/imgs/blood-angel-port.png';
import fallen from '../assets/imgs/the-fallen-port.png';
import uniquid from "uniqid";

const shipList = [
    {
        type: 'carrier',
        key: uniquid(),
        length: 5,
        hp: 5,
        isSunk: false,
        defaultX: 2,
        defaultY: 2,
        subX: 3,
        subY: 2,
        draggable: false,
        axis: 'x',
        display: 'player',
        render: (props) => {
            return (
                <Carrier {...props}></Carrier>
            )
        }
    },
    {
        type: 'battleship',
        key: uniquid(),
        length: 4,
        hp: 4,
        isSunk: false,
        defaultX: 5,
        defaultY: 2,
        subX: 2,
        subY: 4,
        draggable: false,
        axis: 'x',
        display: 'player',
        render: (props) => {
            return (
                <Battleship {...props}></Battleship>
            )
        }
    },
    {
        type: 'destroyer',
        key: uniquid(),
        length: 3,
        hp: 3,
        isSunk: false,
        defaultX: 8,
        defaultY: 2,
        subX: 7,
        subY: 4,
        draggable: false,
        axis: 'x',
        display: 'player',
        render: (props) => {
            return (
                <Destroyer {...props}></Destroyer>
            )
        }
    }
];

const winnerDialogue = [
    {
        faction: 'protag',
        name: null,
        avatar: roboute,
        line: 'We won but at what cost...Should I continue to conquer the heretics or go back to Terra?',
        key: uniquid()
    },
    {
        faction: 'villain',
        name: 'Horus Lupercal',
        avatar: horus,
        line: 'Suck our dicks for we are many!',
        key: uniquid()
    },
    {
        faction: 'protag',
        name: null,
        avatar: roboute,
        line: 'We won but at what cost...Should I continue to conquer the heretics or go back to Terra?',
        key: uniquid()
    },
    {
        faction: 'protag',
        name: null,
        avatar: roboute,
        line: 'We won but at what cost...Should I continue to conquer the heretics or go back to Terra?',
        key: uniquid()
    },
    {
        faction: 'protag',
        name: null,
        avatar: roboute,
        line: 'We won but at what cost...Should I continue to conquer the heretics or go back to Terra?',
        key: uniquid()
    },
    {
        faction: 'protag',
        name: null,
        avatar: roboute,
        line: 'We won but at what cost...Should I continue to conquer the heretics or go back to Terra?',
        key: uniquid()
    }
];

const loserDialogue = [
    {
        faction: 'villain',
        name: 'Horus Lupercal',
        avatar: horus,
        line: 'You\'re so fucked'
    },
    {
        faction: 'protag',
        name: null,
        avatar: roboute,
        line: 'Yeah right'
    }
];

const goOn = [
    {
        faction: 'protag',
        name: 'Blood Angel',
        avatar: blood,
        line: 'At your command High Lord Admiral. For the Emperor!'
    }
];
const giveUp = [
    {
        faction: 'villain',
        name: 'Arch Betrayer Luther',
        avatar: fallen,
        line: 'As I said, Admiral, be careful from whom one gains knowledge and be aware of the price of its acquisition.'
    }
];


export { shipList, winnerDialogue, loserDialogue, goOn, giveUp }