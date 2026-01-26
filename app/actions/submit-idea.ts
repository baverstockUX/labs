'use server'

interface State {
    message: string;
}

export async function submitIdea(prevState: State, formData: FormData) {
    const title = formData.get('title');
    const description = formData.get('description');
    const name = formData.get('name');
    const email = formData.get('email');

    console.log('Pitch Submitted:', { title, description, name, email });

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return { message: 'Idea submitted successfully!' };
}
