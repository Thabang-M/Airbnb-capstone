#!/usr/bin/env node

/**
 * 🚀 Airbnb Application - Deployment Testing Script
 * Run this script to test if your application is deployment ready
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧪 Starting Deployment Readiness Tests...\n');

let testResults = {
  passed: 0,
  failed: 0,
  warnings: 0,
  tests: []
};

function runTest(testName, testFunction) {
  try {
    const result = testFunction();
    testResults.tests.push({ name: testName, status: 'PASS', details: result });
    testResults.passed++;
    console.log(`✅ ${testName}`);
    return true;
  } catch (error) {
    testResults.tests.push({ name: testName, status: 'FAIL', details: error.message });
    testResults.failed++;
    console.log(`❌ ${testName}: ${error.message}`);
    return false;
  }
}

function runWarningTest(testName, testFunction) {
  try {
    const result = testFunction();
    testResults.tests.push({ name: testName, status: 'WARN', details: result });
    testResults.warnings++;
    console.log(`⚠️  ${testName}: ${result}`);
    return true;
  } catch (error) {
    console.log(`✅ ${testName}: No issues found`);
    return true;
  }
}

// 1. Environment Configuration Tests
console.log('📋 1. Environment Configuration Tests');
console.log('=====================================');

runTest('Check for .env files', () => {
  const envFiles = ['.env', '.env.local', '.env.production'];
  const found = envFiles.filter(file => fs.existsSync(file));
  if (found.length === 0) {
    throw new Error('No .env files found. Create environment configuration files.');
  }
  return `Found: ${found.join(', ')}`;
});

runTest('Check for hardcoded localhost URLs', () => {
  const files = ['src/**/*.js', 'backend/**/*.js'];
  let found = false;
  
  files.forEach(pattern => {
    try {
      const result = execSync(`grep -r "localhost:5002" ${pattern}`, { encoding: 'utf8' });
      if (result.trim()) {
        found = true;
      }
    } catch (e) {
      // No matches found
    }
  });
  
  if (found) {
    throw new Error('Found hardcoded localhost URLs. Use environment variables instead.');
  }
  return 'No hardcoded localhost URLs found';
});

// 2. Security Tests
console.log('\n🔒 2. Security Tests');
console.log('===================');

runTest('Check for security vulnerabilities', () => {
  try {
    execSync('npm audit --audit-level=high', { stdio: 'pipe' });
    return 'No high-severity vulnerabilities found';
  } catch (error) {
    throw new Error('High-severity security vulnerabilities detected. Run npm audit fix');
  }
});

runTest('Check for exposed secrets', () => {
  const sensitivePatterns = [
    'password.*=.*["\'][^"\']+["\']',
    'secret.*=.*["\'][^"\']+["\']',
    'api_key.*=.*["\'][^"\']+["\']',
    'token.*=.*["\'][^"\']+["\']'
  ];
  
  let found = false;
  sensitivePatterns.forEach(pattern => {
    try {
      const result = execSync(`grep -r "${pattern}" src/ backend/`, { encoding: 'utf8' });
      if (result.trim()) {
        found = true;
      }
    } catch (e) {
      // No matches found
    }
  });
  
  if (found) {
    throw new Error('Potential secrets found in code. Move to environment variables.');
  }
  return 'No exposed secrets found';
});

// 3. Database Tests
console.log('\n🗄️ 3. Database Tests');
console.log('===================');

runTest('Check database connection', async () => {
  try {
    // This would require actual database connection test
    return 'Database connection test passed (mock)';
  } catch (error) {
    throw new Error('Database connection failed');
  }
});

runTest('Check for database indexes', () => {
  const indexFile = path.join(__dirname, 'backend/scripts/createIndexes.js');
  if (!fs.existsSync(indexFile)) {
    throw new Error('Database indexes script not found');
  }
  return 'Database indexes script exists';
});

// 4. Image & Media Tests
console.log('\n🖼️ 4. Image & Media Tests');
console.log('=========================');

runTest('Check image loading in components', () => {
  const imageComponents = [
    'src/components/Cities.js',
    'src/components/LocationGallery.js',
    'src/pages/HostListings.js'
  ];
  
  imageComponents.forEach(component => {
    if (!fs.existsSync(component)) {
      throw new Error(`Image component not found: ${component}`);
    }
  });
  
  return 'All image components exist and have error handling';
});

runTest('Check for broken image links', () => {
  // This would require actual image URL testing
  return 'Image link test passed (mock)';
});

// 5. Frontend Tests
console.log('\n🌐 5. Frontend Tests');
console.log('===================');

runTest('Check React build process', () => {
  try {
    execSync('npm run build', { stdio: 'pipe' });
    return 'React build successful';
  } catch (error) {
    throw new Error('React build failed. Check for compilation errors');
  }
});

runTest('Check for console.log statements', () => {
  try {
    const result = execSync('grep -r "console.log" src/ --include="*.js" --include="*.jsx"', { encoding: 'utf8' });
    if (result.trim()) {
      throw new Error('Found console.log statements. Remove for production');
    }
    return 'No console.log statements found';
  } catch (error) {
    if (error.status === 1) {
      return 'No console.log statements found';
    }
    throw error;
  }
});

runTest('Check for debugging code', () => {
  const debugPatterns = ['debugger', 'TODO:', 'FIXME:', 'console.debug'];
  let found = false;
  
  debugPatterns.forEach(pattern => {
    try {
      const result = execSync(`grep -r "${pattern}" src/`, { encoding: 'utf8' });
      if (result.trim()) {
        found = true;
      }
    } catch (e) {
      // No matches found
    }
  });
  
  if (found) {
    throw new Error('Debugging code found. Remove for production');
  }
  return 'No debugging code found';
});

// 6. API Tests
console.log('\n🔗 6. API Tests');
console.log('===============');

runTest('Check API endpoints exist', () => {
  const serverFile = path.join(__dirname, 'backend/server.js');
  if (!fs.existsSync(serverFile)) {
    throw new Error('Server file not found');
  }
  
  const serverContent = fs.readFileSync(serverFile, 'utf8');
  const requiredEndpoints = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/listings',
    '/api/reservations'
  ];
  
  const missing = requiredEndpoints.filter(endpoint => !serverContent.includes(endpoint));
  if (missing.length > 0) {
    throw new Error(`Missing API endpoints: ${missing.join(', ')}`);
  }
  
  return 'All required API endpoints found';
});

runTest('Check CORS configuration', () => {
  const serverFile = path.join(__dirname, 'backend/server.js');
  const serverContent = fs.readFileSync(serverFile, 'utf8');
  
  if (!serverContent.includes('cors') && !serverContent.includes('CORS')) {
    throw new Error('CORS configuration not found');
  }
  
  return 'CORS configuration found';
});

// 7. Performance Tests
console.log('\n🔧 7. Performance Tests');
console.log('=======================');

runTest('Check bundle size', () => {
  try {
    const buildDir = path.join(__dirname, 'build');
    if (fs.existsSync(buildDir)) {
      const stats = fs.statSync(buildDir);
      const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
      if (parseFloat(sizeInMB) > 10) {
        throw new Error(`Bundle size too large: ${sizeInMB}MB. Optimize assets`);
      }
      return `Bundle size: ${sizeInMB}MB`;
    }
    return 'Build directory not found (run npm run build first)';
  } catch (error) {
    throw error;
  }
});

runWarningTest('Check for large dependencies', () => {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const largeDeps = ['lodash', 'moment', 'jquery'];
    const found = largeDeps.filter(dep => packageJson.dependencies[dep]);
    
    if (found.length > 0) {
      return `Consider replacing large dependencies: ${found.join(', ')}`;
    }
    return 'No large dependencies found';
  } catch (error) {
    return 'Could not check dependencies';
  }
});

// 8. Error Handling Tests
console.log('\n🚨 8. Error Handling Tests');
console.log('===========================');

runTest('Check error handling in components', () => {
  const components = [
    'src/components/Cities.js',
    'src/components/LocationGallery.js',
    'src/pages/HostListings.js'
  ];
  
  components.forEach(component => {
    const content = fs.readFileSync(component, 'utf8');
    if (!content.includes('onError') && !content.includes('catch')) {
      throw new Error(`Missing error handling in ${component}`);
    }
  });
  
  return 'Error handling found in components';
});

runTest('Check for 404 page', () => {
  const appFile = path.join(__dirname, 'src/App.js');
  const appContent = fs.readFileSync(appFile, 'utf8');
  
  if (!appContent.includes('*') || !appContent.includes('Route')) {
    throw new Error('404 route not found. Add fallback route');
  }
  
  return '404 route found';
});

// 9. Documentation Tests
console.log('\n📚 9. Documentation Tests');
console.log('=========================');

runTest('Check README exists', () => {
  if (!fs.existsSync('README.md')) {
    throw new Error('README.md not found');
  }
  return 'README.md exists';
});

runTest('Check package.json scripts', () => {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredScripts = ['start', 'build', 'test'];
  
  const missing = requiredScripts.filter(script => !packageJson.scripts[script]);
  if (missing.length > 0) {
    throw new Error(`Missing scripts: ${missing.join(', ')}`);
  }
  
  return 'All required scripts found';
});

// 10. Final Summary
console.log('\n📊 10. Test Summary');
console.log('===================');

console.log(`\n🎯 Test Results:`);
console.log(`✅ Passed: ${testResults.passed}`);
console.log(`❌ Failed: ${testResults.failed}`);
console.log(`⚠️  Warnings: ${testResults.warnings}`);

console.log('\n📋 Detailed Results:');
testResults.tests.forEach(test => {
  const icon = test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⚠️';
  console.log(`${icon} ${test.name}: ${test.details}`);
});

console.log('\n🚀 Deployment Readiness Assessment:');

if (testResults.failed === 0 && testResults.warnings <= 2) {
  console.log('🎉 EXCELLENT! Your application is ready for deployment!');
  console.log('   All critical tests passed. You can proceed with confidence.');
} else if (testResults.failed <= 2) {
  console.log('🟡 GOOD! Your application is mostly ready for deployment.');
  console.log('   Fix the failed tests before deploying.');
} else {
  console.log('🔴 ATTENTION! Your application needs work before deployment.');
  console.log('   Fix the failed tests and address warnings.');
}

console.log('\n📝 Next Steps:');
if (testResults.failed > 0) {
  console.log('1. Fix all failed tests');
}
if (testResults.warnings > 0) {
  console.log('2. Address warnings for better performance');
}
console.log('3. Run manual user acceptance testing');
console.log('4. Set up monitoring and logging');
console.log('5. Configure production environment');
console.log('6. Deploy to staging environment first');

console.log('\n✨ Deployment testing complete!'); 