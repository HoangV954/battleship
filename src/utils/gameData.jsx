import Carrier from "../components/Ships/ShipImages/Carrier";
import Battleship from "../components/Ships/ShipImages/Battleship";
import Destroyer from "../components/Ships/ShipImages/Destroyer";
import uniquid from "uniqid";

const shipList = [
    {
        type: 'carrier',
        key: uniquid(),
        length: 5,
        hp: 5,
        defaultX: 2,
        defaultY: 2,
        subX: 3,
        subY: 2,
        draggable: false,
        axis: 'x',
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
        defaultX: 5,
        defaultY: 2,
        subX: 2,
        subY: 4,
        draggable: false,
        axis: 'x',
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
        defaultX: 8,
        defaultY: 2,
        subX: 7,
        subY: 4,
        draggable: false,
        axis: 'x',
        render: (props) => {
            return (
                <Destroyer {...props}></Destroyer>
            )
        }
    }
]


export { shipList }