/**
 * Notifications component
 * Description: Show notifications based on redux state maintained as per NotificationsSlice
 * Original Author: Akshay Kumar <akshay.nm92@gmail.com>
 */

import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { removeNotification } from '../app/notificationsSlice'

const Notification = ({ id }) => {
  const notification = useSelector((state) => state.notifications.values[id])
  const dispatch = useDispatch()

  useEffect(() => {
    const timeout = setTimeout(() => dispatch(removeNotification(id)), 3000)
    return () => clearTimeout(timeout)
  }, [id, dispatch])

  return (
    <>
      {notification && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {notification.isSuccess && <div className="success-notification">{notification.message}</div>}
          {notification.isWarning && <div className="warning-notification">{notification.message}</div>}
          {notification.isError && <div className="error-notification">{notification.message}</div>}
          {!(notification.isSuccess || notification.isWarning || notification.isError) && (
            <div className="simple-notification">{notification.message}</div>
          )}
        </motion.div>
      )}
    </>
  )
}
Notification.propTypes = {
  id: PropTypes.string.isRequired,
}

const NotificationsList = () => {
  const notifications = useSelector((state) => state.notifications.ids)
  return (
    <>
      {notifications.map((id) => (
        <Notification key={id} id={id} />
      ))}
    </>
  )
}

const Notifications = () => (
  <div className="absolute bottom-0 pointer-events-none h-48 flex flex-col-reverse p-4">
    <AnimatePresence>
      <NotificationsList />
    </AnimatePresence>
  </div>
)

export default Notifications
