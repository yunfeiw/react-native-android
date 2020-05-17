import React from "react"
import {Platform } from 'react-native'

import Ios from './ios'
import Android from './andorid'

export default Platform.OS === "ios" ? Ios : Android;
