import { test, expect } from '../../fixtures/test-data-fixtures'
import runQuery from '../../helpers/dbUtils'

test.describe.configure({ mode: 'serial' })
test.describe('Students CRUD', () => {
  let studentId: string
  test('Create student using POST', async ({ request, studentsData }) => {
    const response = await request.post(process.env.API_ENDPOINT, {
      //   headers: {
      //     Accept: 'application/json',
      //     Authorization: 'Bearer token saudnasud123213123',
      //   },
      data: studentsData.postRequestBody,
    })

    expect(response.ok()).toBeTruthy()

    // Fetching the status code and print
    const statusCode = response.status()
    expect(statusCode).toBe(200)
    console.log(statusCode)

    const responseBody = await response.json()
    console.log(responseBody)

    //store the studentId here
    studentId = responseBody.id

    // Validate that the response body matches with request body
    // expect(responseBody).toEqual(studentsData.postRequestBody)

    for (const key in studentsData.postRequestBody) {
      expect(responseBody[key]).toBe(studentsData.postRequestBody[key])
    }

    const query = `SELECT * FROM student WHERE email = '${studentsData.postRequestBody.email}'`

    const result = await runQuery(query)

    console.log(result + ' Is my Query')

    expect(result).toBeDefined()
    expect(result.length).toBe(1)
  })

  test('Create a new request using GET', async ({ request }) => {
    const response = await request.get(`${process.env.API_ENDPOINT}/${studentId}`)

    expect(response.ok()).toBeTruthy()

    const responseBody = await response.json()
    console.log(responseBody)
  })

  test('Create a new request using PUT', async ({ request, studentsData }) => {
    const response = await request.put(`${process.env.API_ENDPOINT}/${studentId}`, {
      //   headers: {
      //     Accept: 'application/json',
      //     Authorization: 'Bearer token saudnasud123213123',
      //   },
      data: studentsData.putRequestBody,
    })
    expect(response.ok()).toBeTruthy()

    const responseBody = await response.json()
    console.log(responseBody)

    for (const key in studentsData.putRequestBody) {
      expect(responseBody[key]).toBe(studentsData.putRequestBody[key])
    }
  })

  test('Create a new request using DELETE', async ({ request, studentsData }) => {
    const response = await request.delete(`${process.env.API_ENDPOINT}/${studentId}`)

    expect(response.ok()).toBeTruthy()

    const query = `SELECT * FROM student WHERE email = '${studentsData.putRequestBody.email}'`

    const result = await runQuery(query)
    expect(result.length).toBe(0)
  })
})