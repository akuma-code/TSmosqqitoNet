import React, { useState, useEffect } from 'react'
import { WhInfo } from '../types/WHTypes'
type Itype = WhInfo[]

export const useAutoCheck = (infoArray: Itype) => {
    const [infos, setInfos] = useState<Itype>(infoArray)
}