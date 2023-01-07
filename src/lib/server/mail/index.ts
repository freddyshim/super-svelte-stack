import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  BASE_URL,
} from '$env/static/private'
import nodemailer from 'nodemailer'
import * as aws from '@aws-sdk/client-ses'

export const getVerifyContent = (token: string) =>
  `
    <div style="margin: auto; width: 40%; padding: 10px">
      <h2>Email Verification Request</h2>
      <p>Welcome to Super Svelte Kit! Verify your email by clicking the link below:</p>
      <h4><a href=${BASE_URL}/auth/verify/${token}>Verify Email Address</a></h4>
    </div>
`

const ses = new aws.SES({
  apiVersion: '2010-12-01',
  region: AWS_REGION,
  credentials: {
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    accessKeyId: AWS_ACCESS_KEY_ID,
  },
})

const mailer = nodemailer.createTransport({
  SES: { ses, aws },
})

export default mailer
