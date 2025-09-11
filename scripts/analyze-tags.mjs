#!/usr/bin/env node

/**
 * Comprehensive tag comparison script
 * Compares local vs remote tags to identify mismatches
 */

import { spawn, exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

console.log('🔍 Analyzing local vs remote tag mismatches...\n');

async function compareTags() {
  try {
    // Get local tags with their commit hashes
    const { stdout: localTags } = await execAsync('git show-ref --tags');
    const localTagMap = new Map();
    
    localTags.trim().split('\n').forEach(line => {
      const [commit, ref] = line.split(' ');
      const tag = ref.replace('refs/tags/', '');
      localTagMap.set(tag, commit);
    });

    // Get remote tags with their commit hashes
    const { stdout: remoteTags } = await execAsync('git ls-remote --tags origin');
    const remoteTagMap = new Map();
    
    remoteTags.trim().split('\n').forEach(line => {
      const [commit, ref] = line.split('\t');
      const tag = ref.replace('refs/tags/', '');
      remoteTagMap.set(tag, commit);
    });

    console.log(`📊 Found ${localTagMap.size} local tags and ${remoteTagMap.size} remote tags\n`);

    // Compare tags
    const mismatches = [];
    const onlyLocal = [];
    const onlyRemote = [];

    // Check for mismatches and local-only tags
    for (const [tag, localCommit] of localTagMap) {
      if (remoteTagMap.has(tag)) {
        const remoteCommit = remoteTagMap.get(tag);
        if (localCommit !== remoteCommit) {
          mismatches.push({ tag, localCommit, remoteCommit });
        }
      } else {
        onlyLocal.push({ tag, commit: localCommit });
      }
    }

    // Check for remote-only tags
    for (const [tag, remoteCommit] of remoteTagMap) {
      if (!localTagMap.has(tag)) {
        onlyRemote.push({ tag, commit: remoteCommit });
      }
    }

    // Report results
    if (mismatches.length === 0 && onlyLocal.length === 0 && onlyRemote.length === 0) {
      console.log('✅ All tags are perfectly synchronized!');
      console.log('🎉 No tag mismatches found.');
    } else {
      if (mismatches.length > 0) {
        console.log('❌ COMMIT MISMATCHES FOUND:');
        mismatches.forEach(({ tag, localCommit, remoteCommit }) => {
          console.log(`   ${tag}:`);
          console.log(`     Local:  ${localCommit}`);
          console.log(`     Remote: ${remoteCommit}`);
        });
        console.log('');
      }

      if (onlyLocal.length > 0) {
        console.log('🏠 LOCAL-ONLY TAGS:');
        onlyLocal.forEach(({ tag, commit }) => {
          console.log(`   ${tag}: ${commit}`);
        });
        console.log('');
      }

      if (onlyRemote.length > 0) {
        console.log('☁️  REMOTE-ONLY TAGS:');
        onlyRemote.forEach(({ tag, commit }) => {
          console.log(`   ${tag}: ${commit}`);
        });
        console.log('');
      }
    }

    // Check if v2.2.0 specifically has issues
    if (localTagMap.has('v2.2.0') && remoteTagMap.has('v2.2.0')) {
      const localV220 = localTagMap.get('v2.2.0');
      const remoteV220 = remoteTagMap.get('v2.2.0');
      
      console.log(`🔍 v2.2.0 Analysis:`);
      console.log(`   Local:  ${localV220}`);
      console.log(`   Remote: ${remoteV220}`);
      console.log(`   Match:  ${localV220 === remoteV220 ? '✅' : '❌'}`);
    }

  } catch (error) {
    console.error('❌ Error analyzing tags:', error.message);
  }
}

compareTags();
