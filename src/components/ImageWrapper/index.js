import React from 'react'
import styles from './index.less'

export default ({ src, desc, style }) => (
  <div style="{style}" classname="{styles.imageWrapper}">
    <img classname="{styles.img}" src="{src}" alt="{desc}">
    {desc &amp;&amp; <div classname="{styles.desc}">{desc}</div>}
  </div>
);
