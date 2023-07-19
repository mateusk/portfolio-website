<script setup lang="ts">
  const props = defineProps<{
    credits: {
      client: {
        text: string
        url: string
      }
      developedAt: {
        text: string
        url: string
      }
      year: string
      roles: {
        role: string
        names: string[]
      }[]
    }
  }>()

  const randomPositions = ref<{ x: number; y: number }[]>([])

  const numEntries = ref(0)

  onMounted(() => {
    if (!props.credits) return
    if (props.credits.client) numEntries.value++
    if (props.credits.developedAt) numEntries.value++
    if (props.credits.year) numEntries.value++
    if (props.credits.roles) numEntries.value += props.credits.roles.length
    for (let i = 0; i < numEntries.value; i++) {
      randomPositions.value.push({
        x: Math.random() * (window.innerWidth - 50) + 25,
        y: Math.random() * (window.innerHeight - 50) + 25,
      })
    }
  })

  // Generate a CSS grid template string with columns and rows based
  // on the number of entries. Each entry should be a cell.
  const gridLayout = computed(() => {
    if (!props.credits) return

    let entryCounter = numEntries.value

    const templateTerms = [] as string[]
    if (props.credits.client) templateTerms.push('client')
    if (props.credits.developedAt) templateTerms.push('developed-at')
    if (props.credits.year) templateTerms.push('year')
    if (props.credits.roles) templateTerms.push('roles')

    const numColumns = numEntries.value
    const numRows = numEntries.value

    let gridTemplateString = ''
    for (let i = 0; i < numColumns; i++) {
      gridTemplateString += '"'
      for (let j = 0; j < numRows; j++) {
        if (j < numRows) {
          gridTemplateString += '. '
        } else {
          gridTemplateString += '.'
        }
      }

      gridTemplateString += '"\n'
    }

    // Replace any random cell (.) with a template term

    // Convert the string to an array to be able to replace
    // a random cell with a template term
    const gridTemplateStringArray = gridTemplateString.split('')

    // // Replace a random cell with a template term
    while (entryCounter > 0) {
      for (let i = 0; i < gridTemplateStringArray.length; i++) {
        if (gridTemplateStringArray[i] === '.' && Math.random() > 0.8) {
          gridTemplateStringArray[i] = templateTerms[entryCounter - 1]
          entryCounter--
          if (entryCounter === 0) break
        }
      }
    }

    // Convert the array back to a string
    gridTemplateString = gridTemplateStringArray.join('')

    return gridTemplateString
  })
</script>

<template>
  <section class="credits">
    <div
      class="client"
      :class="{ vertical: Math.random() > 0.5 }"
      :style="{ gridArea: 'client' }"
      v-if="credits.client"
    >
      <h2>Client</h2>
      <span class="line"></span>
      <a
        :href="credits.client.url"
        target="_blank"
      >
        {{ credits.client.text }}
      </a>
    </div>
    <div
      class="developed-at"
      :class="{ vertical: Math.random() > 0.5 }"
      :style="{ gridArea: 'developed-at' }"
      v-if="credits.developedAt"
    >
      <h2>Developed at</h2>
      <span class="line"></span>
      <a
        :href="credits.developedAt.url"
        target="_blank"
      >
        {{ credits.developedAt.text }}
      </a>
    </div>
    <div
      class="year"
      :class="{ vertical: Math.random() > 0.5 }"
      :style="{ gridArea: 'year' }"
    >
      <h2>Year</h2>
      <span class="line"></span>
      <p>{{ credits.year }}</p>
    </div>
    <div
      class="roles"
      :style="{ gridArea: 'roles' }"
    >
      <div
        v-for="roleDescription in credits.roles"
        class="role"
        :class="{ vertical: Math.random() > 0.5 }"
      >
        <h2>{{ roleDescription.role }}</h2>
        <span class="line"></span>
        <p
          v-for="(name, nameIndex) in roleDescription.names"
          :key="nameIndex"
        >
          {{
            name + (nameIndex < roleDescription.names.length - 1 ? ', ' : '')
          }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .credits {
    display: grid;
    grid-template: v-bind(gridLayout);
    width: 100%;
    height: 100vh;
  }

  .credits .client,
  .credits .developed-at,
  .credits .year,
  .credits .roles .role {
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
  }

  .credits .client.vertical,
  .credits .developed-at.vertical,
  .credits .year.vertical,
  .credits .roles .role.vertical {
    flex-direction: column;
  }

  .credits h2 {
    font-family: 'HK Grotesk Semibold', sans-serif;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1.2px;
  }

  .credits .roles p {
    display: inline;
    margin: 0;
  }

  .credits .line {
    display: block;
    width: 100px;
    height: 1px;
    background-color: var(--text-color);
  }

  .credits .client.vertical .line,
  .credits .developed-at.vertical .line,
  .credits .year.vertical .line,
  .credits .roles .role.vertical .line {
    width: 1px;
    height: 100px;
  }
</style>
