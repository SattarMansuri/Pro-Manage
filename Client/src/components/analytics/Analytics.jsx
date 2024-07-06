import React, { useEffect, useState } from 'react'
import styles from './Analytics.module.css'
import HomePage from '../../pages/home Page/HomePage'
import {getTaskAnalytics} from '../../apis/task'

const Analytics = () => {
  const [allAnalytics, setAllAnalytcs] = useState({})
  const getAnalytics = async ()=>{
    const response = await getTaskAnalytics()
    setAllAnalytcs(response.data)
  }
  useEffect(()=>{
    getAnalytics()
  },[])
  return (
    <div className={styles.analytics}>
    <div className={styles.leftSection}>
      <HomePage/>
    </div>
    <div className={styles.rightSection}>
      <h1>Analytics</h1>
      <div className={styles.task}>
        <p className={styles.leftTask}>
            <li><span className={styles.dot}>&#11044;</span> &nbsp; Backlog Task  <span className={styles.number1}>{allAnalytics?.backlogTask}</span></li>
            <li><span className={styles.dot}>&#11044;</span> &nbsp; To-do Tasks <span className={styles.number2}>{allAnalytics?.todoTask}</span></li>
            <li><span className={styles.dot}>&#11044;</span> &nbsp; In-Progress tasks <span className={styles.number3}>{allAnalytics?.inProgress}</span></li>
            <li><span className={styles.dot}>&#11044;</span> &nbsp; Completed Tasks <span className={styles.number4}>{allAnalytics?.doneTask}</span></li>
        </p>
        <p className={styles.rightTask}>
        <li><span className={styles.dot}>&#11044;</span> &nbsp; Low Priority  <span className={styles.number1}>{allAnalytics?.lowPriority}</span></li>
            <li><span className={styles.dot}>&#11044;</span> &nbsp; Moderate prioirity <span className={styles.number5}>{allAnalytics?.moderatePriority}</span></li>
            <li><span className={styles.dot}>&#11044;</span> &nbsp; High Priority <span className={styles.number6}>{allAnalytics?.highPriority}</span></li>
            <li><span className={styles.dot}>&#11044;</span> &nbsp; Due Dates tasks<span className={styles.number7}>{allAnalytics?.dueDatetaskTotal - allAnalytics?.dueDateTaskNull}</span></li>
        </p>
      </div>
    </div>
    </div>
  )
}

export default Analytics