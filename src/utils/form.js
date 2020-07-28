export default function resetForm(data) {
  const self = data // you need this because *this* will refer to Object.keys below`

  // Iterate through each object field, key is name of the object field`
  Object.keys(data).forEach(function(key, index) {
    self[key] = ''
  })
}
