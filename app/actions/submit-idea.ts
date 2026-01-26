'use server'

export async function submitIdea(prevState: any, formData: FormData) {
    const title = formData.get('title');
    const description = formData.get('description');
    const name = formData.get('name');
    const email = formData.get('email');

    console.log('Pitch Submitted:', { title, description, name, email });

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return { message: 'Idea submitted successfully!' };
}
