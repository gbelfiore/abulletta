'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './HomePage.module.css';
// import { HTMLToJSON } from "html-to-json-parser";
// import { html2json } from "html2json";

const HomePage = () => {
  const [data, setData] = useState<Array<Object>>([]);
  const refTextarea = useRef<HTMLTextAreaElement | null>(null);
  const refTtable = useRef<HTMLTableElement | null>(null);

  const elaborate = useCallback(async () => {
    if (refTextarea.current?.value) {
      var parser = new DOMParser();

      var doc = parser.parseFromString(refTextarea.current?.value, 'text/html');

      const groupDays = doc.querySelectorAll('div.container.ng-star-inserted');

      let date: string;
      const saveEvents: Array<Object> = [];
      groupDays.forEach((groupDay: any, betterid) => {
        date = groupDay.querySelector('div.label.ng-star-inserted')?.textContent ?? date;

        const time = groupDay.querySelector('div.row--teams_preMatch_box_time.ng-star-inserted')?.textContent;

        const eventName = groupDay
          .querySelector('div.row--teams_preMatch_box_label.row--teams_preMatch_box_label_pb > div')
          ?.textContent?.split(' - ');
        const teamin = eventName?.[0];
        const teamout = eventName?.[1];

        const results = groupDay.querySelectorAll('div.quota.ng-star-inserted > app-quota-dumb > div > div.item--valore.ng-star-inserted > span');
        const res_1 = results[0]?.textContent;
        const res_x = results[1]?.textContent;
        const res_2 = results[2]?.textContent;
        if (!(!teamin || !teamout || !res_1 || !res_2 || !res_x)) saveEvents.push({ betterid, date, time, teamin, teamout, res_1, res_x, res_2 });
      });

      setData(saveEvents);

      //   var events = doc.querySelectorAll('div.row--teams_preMatch_box_label.row--teams_preMatch_box_label_pb > div');
      //   const saveEvents: Array<Object> = [];
      //   events.forEach((node: any) => {
      //     const betterid = node.dataset.evtid;
      //     const date = node.dataset.evndate?.split(' ')[0];
      //     const time = node.querySelector('td.time')?.textContent;
      //     const eventName = node.dataset.evtname?.split(' - ');
      //     const teamin = eventName?.[0];
      //     const teamout = eventName?.[1];

      //     const odds = node.querySelectorAll('td.ow');
      //     const res_1 = odds[0].textContent;
      //     const res_x = odds[1].textContent;
      //     const res_2 = odds[2].textContent;

      //     saveEvents.push({ betterid, date, time, teamin, teamout, res_1, res_x, res_2 });
      //   });
      //   setData(saveEvents);
    } else {
      alert('Aggiungi il codice HTML nella textarea');
    }
  }, []);

  return (
    <div className={styles.home}>
      <textarea ref={refTextarea} className="w-full h-[300px]" rows={10} placeholder="copy here HTML code"></textarea>
      <div className={styles.homeConsole}>
        <button className="btn btn-secondary" onClick={elaborate}>
          Elaborate
        </button>
        {refTextarea.current?.value != '' && (
          <button
            className="btn btn-secondary"
            onClick={() => {
              if (refTextarea.current?.value) refTextarea.current.value = '';
              setData([]);
            }}
          >
            Clean
          </button>
        )}
      </div>

      {data && (
        <table className="table w-full mt-[20px] border-white" ref={refTtable}>
          {data.map((e: any) => {
            return (
              <tr key={e.betterid}>
                <td>{e.teamin}</td>
                <td>{e.teamout}</td>
                <td>{e.res_1?.replace('.', ',')}</td>
                <td>{e.res_x?.replace('.', ',')}</td>
                <td>{e.res_2?.replace('.', ',')}</td>
                <td>{e.date}</td>
                <td>{e.time}</td>
              </tr>
            );
          })}
        </table>
      )}
    </div>
  );
};

export default HomePage;
