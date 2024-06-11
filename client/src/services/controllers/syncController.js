import moment from 'moment'
import { useCallback } from 'react'
import { server_url } from '../../../package.json'
import { ToastNotification } from '../../components'
import { payloadServer } from '../../constants/basePayload'
import { getStore } from '../../helpers/utility'
import ApiService from '../ApiService'
import { endpoints } from '../endpoints'
import Login from './loginController'

export default function SyncController() {
  const { getToken, loginServer, logoutServer } = Login()

  const fetchCommodity = useCallback(async (url, username, date, estateCd, callback) => {
    const payload = {
      page: 1,
      per_page: 999,
      paramMap: {
        date: date,
        estate_cd: estateCd
      }
    }
    const basePayload = payloadServer(username, payload)
    await ApiService.jsonRequest(url + endpoints.fetchCommodity, basePayload, async (response) => {
      if (response.isError === 'N')
        sendDataToLocal(endpoints.insertCommodity, response.data.resultSet)
      callback()
    })
  }, [])

  const fetchAppUser = useCallback(async (url, username, date, estateCd, callback) => {
    let page = 1,
      counter = 1,
      total = 100
    const result = []
    const payload = {
      page: page,
      per_page: 100,
      paramMap: {
        date: date,
        estate_cd: estateCd
      }
    }
    const basePayload = payloadServer(username, payload)
    await ApiService.jsonRequest(url + endpoints.fetchAppUser, basePayload, async (response) => {
      if (response.isError === 'N') {
        result.push(response.data.resultSet)
        while (response.data?.total >= total) {
          const payload = {
            page: page + counter,
            per_page: 100,
            paramMap: {
              date: date,
              estate_cd: estateCd
            }
          }
          const basePayload = payloadServer(username, payload)
          await ApiService.jsonRequest(url + endpoints.fetchAppUser, basePayload, (response) => {
            result.push(response.data.resultSet)
          })
          total += 100
          counter++
        }
      }
    })
    sendDataToLocal(endpoints.insertUser, result.flat())
    callback()
  }, [])

  const fetchAppUserPassword = useCallback(async (url, username, date, estateCd, callback) => {
    let page = 1,
      counter = 1,
      total = 100
    const result = []
    const payload = {
      page: page,
      per_page: 100,
      paramMap: {
        date: date,
        estate_cd: estateCd
      }
    }
    const basePayload = payloadServer(username, payload)
    await ApiService.jsonRequest(url + endpoints.fetchPassword, basePayload, async (response) => {
      if (response.isError === 'N') {
        result.push(response.data.resultSet)
        while (response.data?.total >= total) {
          const payload = {
            page: page + counter,
            per_page: 100,
            paramMap: {
              date: date,
              estate_cd: estateCd
            }
          }
          const basePayload = payloadServer(username, payload)
          await ApiService.jsonRequest(url + endpoints.fetchPassword, basePayload, (response) => {
            result.push(response.data.resultSet)
          })
          total += 100
          counter++
        }
      }
    })
    sendDataToLocal(endpoints.insertPassword, result.flat())
    callback()
  }, [])

  const fetchEstate = useCallback(async (url, username, date, estateCd, callback) => {
    let page = 1,
      counter = 1,
      total = 100
    const result = []
    const payload = {
      page: page,
      per_page: 100,
      paramMap: {
        date: date,
        pcc_estate_cd: estateCd
      }
    }
    const basePayload = payloadServer(username, payload)
    await ApiService.jsonRequest(url + endpoints.fetchEstate, basePayload, async (response) => {
      if (response.isError === 'N') {
        result.push(response.data.resultSet)
        while (response.data?.total >= total) {
          const payload = {
            page: page + counter,
            per_page: 100,
            paramMap: {
              date: date,
              pcc_estate_cd: estateCd
            }
          }
          const basePayload = payloadServer(username, payload)
          await ApiService.jsonRequest(url + endpoints.fetchEstate, basePayload, (response) => {
            result.push(response.data.resultSet)
          })
          total += 100
          counter++
        }
      }
    })
    sendDataToLocal(endpoints.insertEstate, result.flat())
    callback()
  }, [])

  const fetchEstateLevel = useCallback(async (url, username, date, estateCd, callback) => {
    let page = 1,
      counter = 1,
      total = 100
    const result = []
    const payload = {
      page: page,
      per_page: 100,
      paramMap: {
        date: date,
        estate_cd: estateCd
      }
    }
    const basePayload = payloadServer(username, payload)
    await ApiService.jsonRequest(
      url + endpoints.fetchEstateLevel,
      basePayload,
      async (response) => {
        if (response.isError === 'N') {
          result.push(response.data.resultSet)
          while (response.data?.total >= total) {
            const payload = {
              page: page + counter,
              per_page: 100,
              paramMap: {
                date: date,
                estate_cd: estateCd
              }
            }
            const basePayload = payloadServer(username, payload)
            await ApiService.jsonRequest(
              url + endpoints.fetchEstateLevel,
              basePayload,
              (response) => {
                result.push(response.data.resultSet)
              }
            )
            total += 100
            counter++
          }
        }
      }
    )
    sendDataToLocal(endpoints.insertEstateLevel, result.flat())
    callback()
  }, [])

  const fetchVehicle = useCallback(async (url, username, date, estateCd, callback) => {
    let page = 1,
      counter = 1,
      total = 100
    const result = []
    const payload = {
      page: page,
      per_page: 100,
      paramMap: {
        date: date,
        estate_cd: estateCd
      }
    }
    const basePayload = payloadServer(username, payload)
    await ApiService.jsonRequest(url + endpoints.fetchVehicle, basePayload, async (response) => {
      if (response.isError === 'N') {
        result.push(response.data.resultSet)
        while (response.data?.total >= total) {
          const payload = {
            page: page + counter,
            per_page: 100,
            paramMap: {
              date: date,
              estate_cd: estateCd
            }
          }
          const basePayload = payloadServer(username, payload)
          await ApiService.jsonRequest(url + endpoints.fetchVehicle, basePayload, (response) => {
            result.push(response.data.resultSet)
          })
          total += 100
          counter++
        }
      }
    })
    sendDataToLocal(endpoints.insertVehicle, result.flat())
    callback()
  }, [])

  const fetchVendor = useCallback(async (url, username, date, estateCd, callback) => {
    let page = 1,
      counter = 1,
      total = 100
    const result = []
    const payload = {
      page: page,
      per_page: 100,
      paramMap: {
        date: date,
        estate_cd: estateCd
      }
    }
    const basePayload = payloadServer(username, payload)
    await ApiService.jsonRequest(url + endpoints.fetchVendor, basePayload, async (response) => {
      if (response.isError === 'N') {
        result.push(response.data.resultSet)
        while (response.data?.total >= total) {
          const payload = {
            page: page + counter,
            per_page: 100,
            paramMap: {
              date: date,
              estate_cd: estateCd
            }
          }
          const basePayload = payloadServer(username, payload)
          await ApiService.jsonRequest(url + endpoints.fetchVendor, basePayload, (response) => {
            result.push(response.data.resultSet)
          })
          total += 100
          counter++
        }
      }
    })
    sendDataToLocal(endpoints.insertVendor, result.flat())
    callback()
  }, [])

  const fetchWorker = useCallback(async (url, username, date, estateCd, callback) => {
    let page = 1,
      counter = 1,
      total = 100
    const result = []
    const payload = {
      page: page,
      per_page: 100,
      paramMap: {
        date: date,
        estate_cd: estateCd
      }
    }
    const basePayload = payloadServer(username, payload)
    await ApiService.jsonRequest(url + endpoints.fetchWorker, basePayload, async (response) => {
      if (response.isError === 'N') {
        result.push(response.data.resultSet)
        while (response.data?.total >= total) {
          const payload = {
            page: page + counter,
            per_page: 100,
            paramMap: {
              date: date,
              estate_cd: estateCd
            }
          }
          const basePayload = payloadServer(username, payload)
          await ApiService.jsonRequest(url + endpoints.fetchWorker, basePayload, (response) => {
            result.push(response.data.resultSet)
          })
          total += 100
          counter++
        }
      }
    })
    sendDataToLocal(endpoints.insertWorker, result.flat())
    callback()
  }, [])

  const fetchMillManager = useCallback(async (url, username, millCd, callback) => {
    const payload = { cd: millCd }
    const basePayload = payloadServer(username, payload)
    await ApiService.jsonRequest(url + endpoints.getMillManager, basePayload, (response) => {
      callback(response.data)
    })
  }, [])

  const getLastTicketNumber = useCallback(async (url, username, millCd, callback) => {
    const payload = { pcc_mill_cd: millCd }
    const basePayload = payloadServer(username, payload)
    await ApiService.jsonRequest(url + endpoints.getLastTicketNumber, basePayload, (response) => {
      callback(response.data)
    })
  }, [])

  const sendDataToLocal = async (url, data) => {
    let payload = []
    for (let i = 0; i < data.length; i++) {
      payload.push(data[i])
      if ((i !== 0 && i % 50 === 0) || i === data.length - 1) {
        ApiService.jsonRequest(url, payload, () => {})
        payload = []
      }
    }
  }

  const syncData = useCallback(
    async (body, loading, dataState) => {
      loading(true)
      const { mill, mill_detail } = getStore('mill')
      const estate = []

      mill_detail?.forEach(async (data) => estate.push(data.pcc_estate_cd))
      if (mill === null || mill_detail === null || mill_detail === undefined) {
        ToastNotification({
          title: 'Kesalahan',
          message: 'Mill belum ada atau belum terdaftar.',
          isError: true
        })
        loading(false)
        return
      }

      try {
        const timer = (ms) => new Promise((res) => setTimeout(res, ms))
        for (let i = 0; i < mill_detail.length; i++) {
          let tokenValid = true
          let isError = true
          // start get token
          dataState('Login to Server')
          getToken(server_url, loading, (tokenResponse) => {
            const payload = {
              locale: 'en_US',
              agent: 'mozzila',
              user: {},
              data: {
                username: body.username,
                estateCd: mill_detail[i].pcc_estate_cd,
                response: body.password,
                token_request: tokenResponse.data.token_request
              }
            }
            tokenValid = false
            loginServer(server_url, payload, (loginResponse) => {
              if (loginResponse.isError === 'N') {
                isError = false
                dataState('Get Commodity Data')
                fetchCommodity(server_url, body.username, mill.last_update, estate, () => {
                  dataState('Get User Data')
                  fetchAppUser(server_url, body.username, mill.last_update, estate, () => {
                    fetchAppUserPassword(
                      server_url,
                      body.username,
                      mill.last_update,
                      estate,
                      () => {
                        dataState('Get Estate Data')
                        fetchEstate(server_url, body.username, mill.last_update, estate, () => {
                          fetchEstateLevel(
                            server_url,
                            body.username,
                            mill.last_update,
                            estate,
                            () => {
                              dataState('Get Vehicle Data')
                              fetchVehicle(
                                server_url,
                                body.username,
                                mill.last_update,
                                estate,
                                () => {
                                  fetchVendor(
                                    server_url,
                                    body.username,
                                    mill.last_update,
                                    estate,
                                    () => {
                                      dataState('Get Worker')
                                      fetchWorker(
                                        server_url,
                                        body.username,
                                        mill.last_update,
                                        estate,
                                        () => {
                                          dataState('Get Customer Data')
                                          fetchMillManager(
                                            server_url,
                                            body.username,
                                            mill.cd,
                                            async (res) => {
                                              const createdDate = moment().format('Y-MM-DD')
                                              const payload = {
                                                ...res,
                                                server_url,
                                                updateDate: createdDate
                                              }
                                              await ApiService.jsonRequest(
                                                endpoints.updateMill,
                                                payload,
                                                () => {}
                                              )
                                              getLastTicketNumber(
                                                server_url,
                                                body.username,
                                                mill.cd,
                                                async (res) => {
                                                  await ApiService.jsonRequest(
                                                    endpoints.syncTicketNumber,
                                                    { tracking_no: res.tracking_no },
                                                    () => {}
                                                  )
                                                  logoutServer(
                                                    server_url,
                                                    body.username,
                                                    mill_detail[i].pcc_estate_cd,
                                                    () => {
                                                      dataState('')
                                                      ToastNotification({
                                                        title: 'Berhasil',
                                                        message: 'Berhasil Update Data',
                                                        isError: false
                                                      })
                                                      if (!isError) loading(false)
                                                      setTimeout(
                                                        () => window.location.reload(),
                                                        2000
                                                      )
                                                    }
                                                  )
                                                }
                                              )
                                            }
                                          )
                                        }
                                      )
                                    }
                                  )
                                }
                              )
                            }
                          )
                        })
                      }
                    )
                  })
                })
              } else {
                if (loginResponse.isError === 'Y' && i === mill_detail.length - 1) {
                  dataState('')
                  ToastNotification({
                    title: 'Kesalahan',
                    message: loginResponse.message,
                    isError: true
                  })
                  loading(false)
                }
              }
            })
            // end login server
          })
          // end get token

          while (tokenValid) await timer(1000)

          if (!isError) break
        }
      } catch (error) {
        dataState('')
        loading(false)
      }
    },
    [
      fetchAppUser,
      fetchAppUserPassword,
      fetchEstate,
      fetchEstateLevel,
      fetchMillManager,
      fetchVehicle,
      fetchVendor,
      fetchWorker,
      getToken,
      loginServer,
      logoutServer
    ]
  )

  return { syncData }
}
