import "./index.css"
import { profile } from './data/db.json'
import { initAuth } from '@/js/auth/auth.js'
import { initPanelToggle } from '@/js/panelToggle.js'

import {
  navbar_container_logo,
  navbar_container_create_img,
  left,
  left_profile,
  left_sidebar,
  left_sidebar_post,

  middle,
  middle_highline,
  middle_create_post,
  middle_cardList,

  right,
  right_message,
  right_friendList,
  right_requestList
} from '@/js/common.js'

navbar_container_logo.textContent = "FLsocial"
navbar_container_create_img.src = profile.img_src

left.appendChild(left_profile)
left.appendChild(left_sidebar)
left.appendChild(left_sidebar_post)

middle.appendChild(middle_highline)
middle.appendChild(middle_create_post)
middle.appendChild(middle_cardList)

right.appendChild(right_message)
right_message.appendChild(right_friendList)
right_message.appendChild(right_requestList)

initAuth()
initPanelToggle()