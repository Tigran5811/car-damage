import classNames from 'classnames/bind';
import styles from './App.css'
import { createEffect, createEvent, createStore } from 'effector';
import { useStore } from 'effector-react';
import axios from 'axios';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

const add = createEvent()
const remove = createEvent()

const fetchDamageFx = createEffect(async () => {
  const { data } = await axios.get('https://myfailemtions.npkn.net/b944ff/')
  return data
})

const $damage = createStore([])
  .on(add, (damage, newDamage) => [...damage, newDamage])
  .on(remove, (damage, index) => damage.filter((item) => item !== index))
  .on(fetchDamageFx.doneData, (_, data) => [...Object.values(data)])


function App() {
  const damage = useStore($damage)
  useEffect(() => {
    fetchDamageFx()
  }, [])
  const ocClick = (e) => {
    e.preventDefault();
    const flag = damage.find(item => e.target.name === item)
    if (!flag) {
      add(e.target.name)
    } else {
      remove(e.target.name)
    }
  }

  const sendData = async () => {
    // const config = {
    //   method: 'post',
    //   url: 'https://myfailemtions.npkn.net/b944ff/\'',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   data: damage
    // };
    // await axios(config)
    await new Promise((resolve) => setTimeout(resolve(), 2500))
  }

  return (
    <div className={cx('container')}>

      <div className={cx('box')}>
        <button className='send' onClick={sendData}>Send</button>
        <div className={cx('box-a')}>
          <button onClick={ocClick} name="A1" className={cx({ A1: damage.find((item) => item === "A1") })}></button>
          <button onClick={ocClick} name="A2" className={cx({ A2: damage.find((item) => item === "A2") })}></button>
          <button onClick={ocClick} name="A3" className={cx({ A3: damage.find((item) => item === "A3") })}></button>
          <button onClick={ocClick} name="A4" className={cx({ A4: damage.find((item) => item === "A4") })}></button>
        </div>
        <div className={cx('box-b')}>
          <div className={cx('box-b_front')}>
            <button onClick={ocClick} name="B1" className={cx({ B1: damage.find((item) => item === "B1") })}></button>
            <button onClick={ocClick} name="B2" className={cx({ B2: damage.find((item) => item === "B2") })}></button>
          </div>
          <button onClick={ocClick} name="B3" className={cx({ B3: damage.find((item) => item === "B3") })}></button>
          <div className={cx('box-b_back')}>
            <button onClick={ocClick} name="B4" className={cx({ B4: damage.find((item) => item === "B4") })}></button>
            <button onClick={ocClick} name="B5" className={cx({ B5: damage.find((item) => item === "B5") })}></button>
          </div>
        </div>
        <div className={cx('box-a')}>
          <button onClick={ocClick} name="C1" className={cx({ C1: damage.find((item) => item === "C1") })}></button>
          <button onClick={ocClick} name="C2" className={cx({ C2: damage.find((item) => item === "C2") })}></button>
          <button onClick={ocClick} name="C3" className={cx({ C3: damage.find((item) => item === "C3") })}></button>
          <button onClick={ocClick} name="C4" className={cx({ C4: damage.find((item) => item === "C4") })}></button>
        </div>
      </div>
    </div>
  )

}
export default App
