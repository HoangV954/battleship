import Carrier from "../components/Ships/ShipImages/Carrier";
import Battleship from "../components/Ships/ShipImages/Battleship";
import Destroyer from "../components/Ships/ShipImages/Destroyer";
import horus from '../assets/imgs/horus-lupercal.png';
import roboute from '../assets/imgs/guilliman.png';
import blood from '../assets/imgs/blood-angel-port.png';
import fallen from '../assets/imgs/the-fallen-port.png';
import daemon from '../assets/imgs/khorne-daemon-port.png';
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
        line: 'Give up. This Imperium is ours. The empire is built upon the foundations of our brother’s bones, blood, sweat and wrath',
        key: uniquid()
    },
    {
        faction: 'villain',
        name: 'Horus Lupercal',
        avatar: horus,
        line: 'You know as well as I that this is not the end. For my brothers will not surrender to fate with dignity',
        key: uniquid()
    },
    {
        faction: 'villain',
        name: 'Horus Lupercal',
        avatar: horus,
        line: 'Those who remain, after that final hour, will fight one another for the right to rule the ashes.',
        key: uniquid()
    },
    {
        faction: 'protag',
        name: null,
        avatar: roboute,
        line: 'You have no idea what you have unleashed upon yourself.',
        key: uniquid()
    }
];

const loserDialogue = [
    {
        faction: 'villain',
        name: 'Horus Lupercal',
        avatar: horus,
        line: 'Listen to your blue clad wretches yelling courage and honor. Do you even know the meaning of those words?',
        key: uniquid()
    },
    {
        faction: 'protag',
        name: null,
        avatar: roboute,
        line: 'There will be no place for me in the paradise to come. But until then, I persist. Until my work is done.',
        key: uniquid()
    },
    {
        faction: 'villain',
        name: 'Horus Lupercal',
        avatar: horus,
        line: 'Open your eyes Admiral. You and your kin are to be my hand on the throat of the future',
        key: uniquid()
    },
    {
        faction: 'protag',
        name: null,
        avatar: roboute,
        line: 'All of creation suffers. Only in accepting our own mortality can we make a difference. Only in bearing the burden of our failures can we find the strength to go on.',
        key: uniquid()
    }
];

const fallBack = [
    {
        faction: 'protag',
        name: null,
        avatar: roboute,
        line: 'Only in detachment from glory, or honour, or jealousy... from life itself can we hope to spare others from grief.',
        key: uniquid()
    }
];

const pursuit = [
    {
        faction: 'villain',
        name: 'Arch Betrayer Luther',
        avatar: fallen,
        line: 'You and your kin are nothing but puppets. Let us join Warmaster Horus and rip this blindfold off of our self-righteous brothers. See the burning galaxy for yourself!',
        key: uniquid()
    }
]

const persist = [
    {
        faction: 'protag',
        name: 'Blood Angel',
        avatar: blood,
        line: 'Emperor\'s judgement arrived. Let us carve fear into the heart of chaos!',
        key: uniquid()
    }
];
const giveUp = [
    {
        faction: 'villain',
        name: 'Khorne Daemon',
        avatar: daemon,
        line: 'Devour them! Blood for the blood god! Skulls for the skull throne!',
        key: uniquid()
    }
];


export { shipList, winnerDialogue, loserDialogue, persist, giveUp, fallBack, pursuit }