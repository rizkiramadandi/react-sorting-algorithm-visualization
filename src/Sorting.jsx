import { useEffect, useState, useRef } from "react"

import { arrayRandomizer } from "./App";

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

export default function Sorting({ array, setArray }) {
    const [max, setMax] = useState(null)
    const [sorting, setSorting] = useState(false)
    const delayValue = useRef(500)

    useEffect(() => {
        setMaxValue()
    }, [array])

    function setMaxValue() {
        setMax(prevState => {
            let m = -1
            array.forEach(a => {
                if(a.value > m) m = a.value
            })
            return m
        })
    }

    function randomize(array) {
        if(!sorting) {
            setArray([...arrayRandomizer(array.length)])
        }
    }

    async function bubbleSort(array) {
        if(!sorting) {
            setSorting(true)
            for(let i = 0 ; i < array.length - 1 ; i++) {
                for(let j = 0 ; j < array.length - 1 ; j++) {

                    // highlight current active index
                    array[j].isActive = array[j + 1].isActive = true
                    setArray([...array])
                    await delay(delayValue.current.value)

                    // check if current index value is more than next index value
                    if(array[j].value > array[j + 1].value) {

                        // swap the two index
                        let temp = array[j].value
                        array[j].value = array[j + 1].value
                        array[j + 1].value = temp
                        setArray([...array])
                        await delay(delayValue.current.value)
                    }

                    // unhighlight current active index
                    array[j].isActive = array[j + 1].isActive = false
                    setArray([...array])
                }
            }
            setSorting(false)
        }
    }

    async function selectionSort(array) {
        if(!sorting) {
            setSorting(true)
            for(let i = 0 ; i < array.length - 1 ; i++) {
                let min = array[i].value
                let idx = i
                for(let j = i + 1 ; j < array.length ; j++) {

                    // highlight current active index
                    array[idx].isActive = array[j].isActive = true
                    setArray([...array])
                    await delay(delayValue.current.value)

                    // check if current min value is more than current index value
                    if(min > array[j].value) {

                        // swap the two index
                        let temp = array[j].value
                        array[j].value = array[idx].value
                        array[idx].value = temp
                        min = temp
                        setArray([...array])
                        await delay(delayValue.current.value)
                    }

                    // unhighlight current active index
                    array[idx].isActive = array[j].isActive = false
                    setArray([...array])
                }
            }
            setSorting(false)
        }
    }

    async function insertionSort(array) {
        if(!sorting) {
            setSorting(true)
            for(let i = 1 ; i < array.length ; i++) {
                let key = array[i].value
                let j = i - 1

                // highlight current anchor index
                array[i].isActive = array[j].isActive = true
                setArray([...array])
                await delay(delayValue.current.value)

                while(j >= 0 && array[j].value > key) {

                    // swap the two index
                    let temp = array[j + 1].value
                    array[j + 1].value = array[j].value
                    array[j].value = temp
                    setArray([...array])
                    await delay(delayValue.current.value)

                    array[j + 1].isActive = false

                    j -= 1

                    if(j + 1 !== i)
                        array[j + 1].isActive = false
                    if(j >= 0)
                        array[j].isActive = false
                    setArray([...array])

                    // highlight current active index
                    if(j >= 0) array[j].isActive = true
                    array[j + 1].isActive = true
                    setArray([...array])
                    await delay(delayValue.current.value)
                }

                if(j >= 0) {
                    array[j].isActive = false
                }
                array[i].isActive = array[j + 1].isActive = false
                setArray([...array])
            }
            setSorting(false)
        }
    }

    return (
        <>
            <div className="flex h-[50vh] gap-1 items-end justify-center">
                { array.map((a, idx) => {
                    const customHeight = `${(a.value/max) * 100}%`
                    const customWidth = `${100/array.length}%`
                    return (
                        <div key={idx} className={`rounded p-1 text-center text-white font-bold flex items-end justify-center ${ a.isActive ? `bg-red-500`:`bg-cyan-500` }`} style={{ height: customHeight, width: customWidth }}>
                            { a.value }
                        </div>
                    )
                }) }
            </div>

            <div className="flex gap-1 justify-center flex-wrap mt-2">
                <button className={`bg-cyan-500 text-white rounded p-2 ${sorting ? `opacity-75 hover:cursor-not-allowed`:`hover:bg-cyan-600`}`} onClick={() => bubbleSort(array)}>
                    Bubble Sort
                </button>
                <button className={`bg-cyan-500 text-white rounded p-2 ${sorting ? `opacity-75 hover:cursor-not-allowed`:`hover:bg-cyan-600`}`} onClick={() => selectionSort(array)}>
                    Selection Sort
                </button>
                <button className={`bg-cyan-500 text-white rounded p-2 ${sorting ? `opacity-75 hover:cursor-not-allowed`:`hover:bg-cyan-600`}`} onClick={() => insertionSort(array)}>
                    Insertion Sort
                </button>
                <button className={`bg-cyan-500 text-white rounded p-2 ${sorting ? `opacity-75 hover:cursor-not-allowed`:`hover:bg-cyan-600`}`} onClick={() => randomize(array)}>
                    Randomize
                </button>
            </div>

            <div className="mt-2 text-center flex gap-1 justify-center">
                <span>1ms</span>
                <input type="range" min="1" max="1000" defaultValue={delayValue} ref={delayValue} />
                <span>1000ms</span>
            </div>
        </>
    )
}