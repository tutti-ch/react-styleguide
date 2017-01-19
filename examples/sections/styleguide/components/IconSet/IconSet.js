import React from 'react'

import classes from './IconSet.scss'

// this file is autogenerated
import iconList from './iconList.js'

// generate an icon dependency dynamically
// IMPORTANT: This *has* to have a hardcoded directory prefix string, c.f. https://webpack.github.io/docs/context.html#dynamic-requires
const getIcon = (iconName) => { return require("../../../node_modules/react-mypages/src/icons/tutti-icons/" + iconName + ".svg") }

const icons = []
for (let i = 0, n = iconList.length, icon; i < n; i++) {
  icon = iconList[i]
  icons[i] = { base64: getIcon(icon), name: icon }
}

const IconSet = () => {
  return (
    <div className={classes.iconSet}>
      {icons.map(({base64, name}) => (
        <div className={classes.icon}>
          <img className={classes.image} src={base64} width='75' height='75' />
          <code className={classes.name}>{name}</code>
        </div>
      ))}
    </div>
  )
}

export default IconSet
