const { Q1, Q4 } = require('../../../../app/constants/schedules')
const { SFI, SFI23 } = require('../../../../app/constants/pillars')

const { getSchedule } = require('../../../../app/batching/vendor-lines/get-schedule')

describe('get schedule', () => {
  test('returns schedule if present', () => {
    const schedule = Q4
    const pillar = SFI

    expect(getSchedule(schedule, pillar)).toEqual(schedule)
  })

  test('returns Q1 if schedule not present and pillar is SFI', () => {
    const schedule = undefined
    const pillar = SFI

    expect(getSchedule(schedule, pillar)).toEqual(Q1)
  })

  test('returns Q1 if schedule not present and pillar is SFI23', () => {
    const schedule = undefined
    const pillar = SFI23

    expect(getSchedule(schedule, pillar)).toEqual(Q1)
  })

  test('returns undefined if schedule not present and pillar is not SFI or SFI23', () => {
    const schedule = undefined
    const pillar = 'not sfi'

    expect(getSchedule(schedule, pillar)).toEqual(undefined)
  })
})
