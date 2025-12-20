import { describe, expect, it } from 'vitest'
import { convertSshToHttp, detectPlatform } from '../src/utils'

describe('convertSshToHttp', () => {
  it('should convert GitHub SSH to HTTPS', () => {
    expect(convertSshToHttp('git@github.com:user/repo.git'))
      .toEqual('https://github.com/user/repo')
  })

  it('should convert GitLab SSH to HTTPS', () => {
    expect(convertSshToHttp('git@gitlab.com:user/repo.git'))
      .toEqual('https://gitlab.com/user/repo')
  })

  it('should convert Bitbucket SSH to HTTPS', () => {
    expect(convertSshToHttp('git@bitbucket.org:user/repo.git'))
      .toEqual('https://bitbucket.org/user/repo')
  })

  it('should handle custom domain (Gitea)', () => {
    expect(convertSshToHttp('git@git.example.com:user/repo.git'))
      .toEqual('https://git.example.com/user/repo')
  })

  it('should handle ssh:// protocol format', () => {
    expect(convertSshToHttp('ssh://git@github.com:22/user/repo.git'))
      .toEqual('https://github.com/user/repo')
  })

  it('should handle HTTPS URLs (passthrough)', () => {
    expect(convertSshToHttp('https://github.com/user/repo.git'))
      .toEqual('https://github.com/user/repo')
  })

  it('should handle HTTP URLs (passthrough)', () => {
    expect(convertSshToHttp('http://github.com/user/repo'))
      .toEqual('http://github.com/user/repo')
  })

  it('should use HTTP when specified', () => {
    expect(convertSshToHttp('git@github.com:user/repo.git', false))
      .toEqual('http://github.com/user/repo')
  })

  it('should throw error for invalid URL', () => {
    expect(() => convertSshToHttp('invalid-url'))
      .toThrow('Unable to parse SSH URL')
  })
})

describe('detectPlatform', () => {
  it('should detect GitHub', () => {
    expect(detectPlatform('https://github.com/user/repo')).toEqual('github')
  })

  it('should detect GitLab', () => {
    expect(detectPlatform('https://gitlab.com/user/repo')).toEqual('gitlab')
  })

  it('should detect Bitbucket', () => {
    expect(detectPlatform('https://bitbucket.org/user/repo')).toEqual('bitbucket')
  })

  it('should detect Codeberg', () => {
    expect(detectPlatform('https://codeberg.org/user/repo')).toEqual('codeberg')
  })

  it('should detect Gitea', () => {
    expect(detectPlatform('https://gitea.example.com/user/repo')).toEqual('gitea')
  })

  it('should return unknown for unrecognized platforms', () => {
    expect(detectPlatform('https://unknown.com/user/repo')).toEqual('unknown')
  })
})
