import React from 'react';
import FaixaGroup from '@/components/katasfaixas/FaixaGroup';
import Kyus from '@/assets/data/kyus.json';
import { defaultMetadata } from '@/utils/DefaultMetadata';
import styles from './page.module.css';

export const metadata = defaultMetadata;

function KatasFaixas() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Katas e Faixas</h1>

      {Kyus.map((kyu) => (
        <FaixaGroup kyu={kyu} key={kyu.faixa} />
      ))}
    </div>
  );
}

export default KatasFaixas;
